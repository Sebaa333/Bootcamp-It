const mongoose = require("mongoose");

// Mismas reglas que public/js/validaciones.js (formulario #contact-form)
const PERSON_NAME_RE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' -]{3,50}$/;
const EMAIL_RE = /^[A-Za-z0-9._%+-]{1,64}@[A-Za-z0-9-]{2,63}(\.[A-Za-z0-9-]{2,63})*\.[A-Za-z]{2,10}$/;
const PHONE_RE = /^[0-9+()\s-]{7,20}$/;

const SUBJECTS = ["producto", "pedido", "cambio", "mayorista", "otro"];

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre es obligatorio."],
      trim: true,
      match: [PERSON_NAME_RE, "El nombre debe tener entre 3 y 50 caracteres (solo letras, espacios, apóstrofo y guion)."]
    },
    email: {
      type: String,
      required: [true, "El e-mail es obligatorio."],
      trim: true,
      match: [EMAIL_RE, "El e-mail no es válido."]
    },
    phone: {
      type: String,
      trim: true,
      validate: {
        // Optativo: vacío es válido.
        validator: (value) => !value || PHONE_RE.test(value),
        message: "El teléfono debe tener entre 7 y 20 caracteres (números, espacios y + - ( ))."
      }
    },
    subject: {
      type: String,
      required: [true, "El asunto es obligatorio."],
      enum: { values: SUBJECTS, message: "El asunto no es válido." }
    },
    comments: {
      type: String,
      required: [true, "Los comentarios son obligatorios."],
      trim: true,
      minlength: [10, "Los comentarios deben tener al menos 10 caracteres."],
      maxlength: [500, "Los comentarios no pueden superar 500 caracteres."]
    }
  },
  { timestamps: true, versionKey: false }
);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = { Contact, SUBJECTS };
