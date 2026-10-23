const fs = require("node:fs/promises");
const path = require("node:path");
const { Product } = require("../models/productModel.cjs");
const { UPLOADS_DIR } = require("../middlewares/upload.cjs");

// Solo estos campos se aceptan desde el body.
const FIELDS = [
  "name",
  "price",
  "stock",
  "brand",
  "category",
  "shortDescription",
  "longDescription",
  "freeShipping",
  "ageFrom",
  "ageTo",
  "badge",
  "oldPrice"
];

function pickFields(body = {}) {
  const data = {};
  for (const field of FIELDS) {
    if (body[field] !== undefined) {
      data[field] = body[field];
    }
  }
  return data;
}

// Borra una foto subida (las del seed en assets/ no se tocan).
async function removeUploadedFile(photo) {
  if (typeof photo === "string" && photo.startsWith("uploads/")) {
    await fs.rm(path.join(UPLOADS_DIR, path.basename(photo)), { force: true });
  }
}

async function listProducts(req, res) {
  const products = await Product.find().sort({ createdAt: 1, _id: 1 });
  res.json(products);
}

async function getProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(product);
}

async function createProduct(req, res) {
  const photo = req.file ? `uploads/${req.file.filename}` : undefined;
  try {
    const product = await Product.create({ ...pickFields(req.body), photo });
    res.status(201).json(product);
  } catch (error) {
    await removeUploadedFile(photo); // no dejar archivos huérfanos si la validación falla
    throw error;
  }
}

async function updateProduct(req, res) {
  const product = await Product.findById(req.params.id);
  if (!product) {
    if (req.file) await removeUploadedFile(`uploads/${req.file.filename}`);
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const previousPhoto = product.photo;
  const newPhoto = req.file ? `uploads/${req.file.filename}` : undefined;
  product.set(pickFields(req.body));
  if (newPhoto) product.photo = newPhoto;

  try {
    await product.save();
  } catch (error) {
    await removeUploadedFile(newPhoto);
    throw error;
  }

  if (newPhoto) await removeUploadedFile(previousPhoto);
  res.json(product);
}

async function deleteProduct(req, res) {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  await removeUploadedFile(product.photo);
  res.json({ message: "Producto eliminado", id: product.id });
}

module.exports = { listProducts, getProduct, createProduct, updateProduct, deleteProduct };
