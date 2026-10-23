const { test, before, after, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../src/app.cjs");
const { Contact } = require("../src/models/contactModel.cjs");

// Base separada de la de productos: node --test corre cada archivo en paralelo.
const TEST_URI = "mongodb://127.0.0.1:27017/mundo_pilar_test_contacts";

const validContact = {
  name: "Ana Pérez",
  email: "ana@example.com",
  phone: "+54 11 4555-0123",
  subject: "producto",
  comments: "Quisiera saber si el tren de madera tiene stock."
};

before(async () => {
  await mongoose.connect(TEST_URI);
});

beforeEach(async () => {
  await Contact.deleteMany({});
});

after(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

test("POST /api/contacts válido crea el contacto", async () => {
  const res = await request(app).post("/api/contacts").send(validContact);
  assert.equal(res.status, 201);
  assert.equal(res.body.email, "ana@example.com");

  const list = await request(app).get("/api/contacts");
  assert.equal(list.status, 200);
  assert.equal(list.body.length, 1);
});

test("POST /api/contacts sin teléfono es válido (campo optativo)", async () => {
  const { phone, ...withoutPhone } = validContact;
  const res = await request(app).post("/api/contacts").send(withoutPhone);
  assert.equal(res.status, 201);
});

test("POST /api/contacts inválido (email, asunto, comentarios) devuelve 400", async () => {
  const res = await request(app)
    .post("/api/contacts")
    .send({ ...validContact, email: "no-es-email", subject: "otra-cosa", comments: "corto" });
  assert.equal(res.status, 400);
  assert.ok(res.body.error);
  assert.equal(await Contact.countDocuments(), 0);
});

test("POST /api/contacts con JSON mal formado devuelve 400", async () => {
  const res = await request(app)
    .post("/api/contacts")
    .set("Content-Type", "application/json")
    .send("{no es json");
  assert.equal(res.status, 400);
  assert.ok(res.body.error);
});
