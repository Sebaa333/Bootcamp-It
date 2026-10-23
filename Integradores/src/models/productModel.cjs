const mongoose = require("mongoose");

// Mismas reglas que public/js/validaciones.js
const CATEGORIES = [
  "munecos",
  "construccion",
  "vehiculos",
  "juegos-mesa",
  "ciencia",
  "creatividad",
  "aire-libre"
];

const PRODUCT_NAME_RE = /^[A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ'.,+&/ -]{3,60}$/;

const hasMax2Decimals = (value) => Math.abs(value * 100 - Math.round(value * 100)) < 1e-6;
const isInteger = (value) => Number.isInteger(value);

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio."],
      trim: true,
      match: [PRODUCT_NAME_RE, "El nombre debe tener entre 3 y 60 caracteres válidos."]
    },
    price: {
      type: Number,
      required: [true, "El precio es obligatorio."],
      min: [0.01, "El precio debe ser mayor a cero."],
      max: [9999999, "El precio no puede superar los 9.999.999."],
      validate: { validator: hasMax2Decimals, message: "El precio admite hasta 2 decimales." }
    },
    stock: {
      type: Number,
      required: [true, "El stock es obligatorio."],
      min: [0, "El stock no puede ser negativo."],
      max: [99999, "El stock no puede superar 99999."],
      validate: { validator: isInteger, message: "El stock debe ser un número entero." }
    },
    brand: {
      type: String,
      required: [true, "La marca es obligatoria."],
      trim: true,
      minlength: [2, "La marca es demasiado corta."],
      maxlength: [40, "La marca es demasiado larga."]
    },
    category: {
      type: String,
      required: [true, "La categoría es obligatoria."],
      enum: { values: CATEGORIES, message: "La categoría no es válida." }
    },
    shortDescription: {
      type: String,
      required: [true, "La descripción corta es obligatoria."],
      trim: true,
      minlength: [10, "La descripción corta debe tener al menos 10 caracteres."],
      maxlength: [120, "La descripción corta no puede superar 120 caracteres."]
    },
    longDescription: {
      type: String,
      required: [true, "La descripción larga es obligatoria."],
      trim: true,
      minlength: [20, "La descripción larga debe tener al menos 20 caracteres."],
      maxlength: [600, "La descripción larga no puede superar 600 caracteres."]
    },
    freeShipping: { type: Boolean, default: false },
    ageFrom: {
      type: Number,
      required: [true, "La edad desde es obligatoria."],
      min: [0, "La edad desde debe estar entre 0 y 99."],
      max: [99, "La edad desde debe estar entre 0 y 99."],
      validate: { validator: isInteger, message: "La edad desde debe ser un número entero." }
    },
    ageTo: {
      type: Number,
      required: [true, "La edad hasta es obligatoria."],
      min: [0, "La edad hasta debe estar entre 0 y 99."],
      max: [99, "La edad hasta debe estar entre 0 y 99."],
      validate: [
        { validator: isInteger, message: "La edad hasta debe ser un número entero." },
        {
          validator: function (value) {
            return this.ageFrom == null || value >= this.ageFrom;
          },
          message: "La edad hasta no puede ser menor que la edad desde."
        }
      ]
    },
    // Ruta relativa a public/: "assets/img/x.svg" (seed) o "uploads/x.png" (subida).
    photo: {
      type: String,
      required: [true, "La foto es obligatoria."],
      trim: true
    },
    // Opcionales (los usa el catálogo): etiqueta "Nuevo" / "-15%" y precio anterior.
    badge: { type: String, trim: true, maxlength: [10, "La etiqueta es demasiado larga."] },
    oldPrice: { type: Number, min: [0.01, "El precio anterior debe ser mayor a cero."] }
  },
  { timestamps: true, versionKey: false }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, CATEGORIES };
