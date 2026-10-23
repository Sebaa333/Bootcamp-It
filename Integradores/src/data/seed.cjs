require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../conexion/conexion.cjs");
const { Product } = require("../models/productModel.cjs");
const products = require("./products.json");

// Carga los 12 productos del catálogo (borra los existentes antes).
async function seed() {
  try {
    await connectDB();
    await Product.deleteMany({});
    const created = await Product.create(products, { ordered: true });
    console.log(`Seed completo: ${created.length} productos insertados.`);
  } catch (error) {
    console.error("Error en el seed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
