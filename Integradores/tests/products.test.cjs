const { test, before, after, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../src/app.cjs");
const { Product } = require("../src/models/productModel.cjs");
const { UPLOADS_DIR } = require("../src/middlewares/upload.cjs");

const TEST_URI = "mongodb://127.0.0.1:27017/mundo_pilar_test";

const validProduct = {
  name: "Tren de madera Test",
  price: "24500.50",
  stock: "10",
  brand: "MaderaViva",
  category: "construccion",
  shortDescription: "Tren de madera para pruebas automáticas.",
  longDescription: "Descripción larga del tren de madera usado en los tests del backend.",
  freeShipping: "true",
  ageFrom: "3",
  ageTo: "8"
};

const PNG = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==", "base64");

// Crea un producto vía API (multipart, como hace el formulario).
function postProduct(fields = validProduct, { photo = true } = {}) {
  const req = request(app).post("/api/products");
  for (const [key, value] of Object.entries(fields)) {
    req.field(key, value);
  }
  if (photo) {
    req.attach("photo", PNG, { filename: "foto.png", contentType: "image/png" });
  }
  return req;
}

before(async () => {
  await mongoose.connect(TEST_URI);
});

beforeEach(async () => {
  await Product.deleteMany({});
});

after(async () => {
  // Limpia fotos que hayan quedado de los tests y la base de pruebas.
  for (const product of await Product.find()) {
    if (product.photo.startsWith("uploads/")) {
      fs.rmSync(path.join(UPLOADS_DIR, path.basename(product.photo)), { force: true });
    }
  }
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

test("GET /api/products devuelve la lista (vacía al inicio)", async () => {
  const res = await request(app).get("/api/products");
  assert.equal(res.status, 200);
  assert.deepEqual(res.body, []);
});

test("POST /api/products con datos válidos crea el producto y guarda la foto", async () => {
  const res = await postProduct();
  assert.equal(res.status, 201);
  assert.equal(res.body.name, "Tren de madera Test");
  assert.equal(res.body.price, 24500.5);
  assert.equal(res.body.freeShipping, true);
  assert.match(res.body.photo, /^uploads\/.+\.png$/);
  assert.ok(fs.existsSync(path.join(UPLOADS_DIR, path.basename(res.body.photo))));

  const list = await request(app).get("/api/products");
  assert.equal(list.body.length, 1);

  // La foto subida se sirve con las cabeceras de seguridad.
  const photo = await request(app).get(`/${res.body.photo}`);
  assert.equal(photo.status, 200);
  assert.equal(photo.headers["x-content-type-options"], "nosniff");
});

test("POST /api/products inválido (nombre corto, edad hasta < desde) devuelve 400", async () => {
  const res = await postProduct({ ...validProduct, name: "ab", ageFrom: "9", ageTo: "2" });
  assert.equal(res.status, 400);
  assert.ok(res.body.error);
  assert.equal(await Product.countDocuments(), 0);
});

test("POST /api/products sin foto devuelve 400", async () => {
  const res = await postProduct(validProduct, { photo: false });
  assert.equal(res.status, 400);
});

test("POST /api/products rechaza archivos que no son imagen", async () => {
  const req = request(app).post("/api/products");
  for (const [key, value] of Object.entries(validProduct)) req.field(key, value);
  req.attach("photo", Buffer.from("no soy imagen"), { filename: "malo.txt", contentType: "text/plain" });
  const res = await req;
  assert.equal(res.status, 400);
});

test("GET /api/products/:id con id mal formado devuelve 400", async () => {
  const res = await request(app).get("/api/products/no-es-un-id");
  assert.equal(res.status, 400);
  assert.ok(res.body.error);
});

test("GET /api/products/:id inexistente devuelve 404", async () => {
  const res = await request(app).get(`/api/products/${new mongoose.Types.ObjectId()}`);
  assert.equal(res.status, 404);
});

test("GET /api/products/:id devuelve el producto", async () => {
  const created = await postProduct();
  const res = await request(app).get(`/api/products/${created.body._id}`);
  assert.equal(res.status, 200);
  assert.equal(res.body.name, "Tren de madera Test");
});

test("PUT /api/products/:id actualiza campos y valida", async () => {
  const created = await postProduct();
  const ok = await request(app).put(`/api/products/${created.body._id}`).field("stock", "99");
  assert.equal(ok.status, 200);
  assert.equal(ok.body.stock, 99);

  const bad = await request(app).put(`/api/products/${created.body._id}`).field("price", "-5");
  assert.equal(bad.status, 400);
});

test("DELETE /api/products/:id elimina el producto y su foto", async () => {
  const created = await postProduct();
  const file = path.join(UPLOADS_DIR, path.basename(created.body.photo));
  assert.ok(fs.existsSync(file));

  const res = await request(app).delete(`/api/products/${created.body._id}`);
  assert.equal(res.status, 200);
  assert.equal(await Product.countDocuments(), 0);
  assert.equal(fs.existsSync(file), false);

  const again = await request(app).delete(`/api/products/${created.body._id}`);
  assert.equal(again.status, 404);
});

test("rutas /api desconocidas devuelven 404 en JSON", async () => {
  const res = await request(app).get("/api/nada");
  assert.equal(res.status, 404);
  assert.ok(res.body.error);
});

test("no se exponen el código del servidor ni .env", async () => {
  for (const route of ["/src/app.cjs", "/app.cjs", "/.env", "/package.json", "/conexion/conexion.cjs"]) {
    assert.equal((await request(app).get(route)).status, 404, route);
  }
});

test("el front se sirve desde src/public", async () => {
  for (const route of ["/", "/index.html", "/alta.html", "/contacto.html", "/nosotros.html"]) {
    const res = await request(app).get(route);
    assert.equal(res.status, 200, route);
    assert.match(res.headers["content-type"], /html/);
  }
  assert.equal((await request(app).get("/js/main.js")).status, 200);
  assert.equal((await request(app).get("/assets/img/oso-peluche.svg")).status, 200);
});
