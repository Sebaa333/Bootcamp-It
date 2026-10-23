// Ejercicio 8: Formulario con validación
//
// Abrí ejercicio8.html. Hay un formulario de registro con tres campos:
// nombre, email y contraseña.
//
// Implementá la validación completa:
//
// VALIDACIÓN EN BLUR (al salir del campo):
//
// 1. Campo "nombre":
//    - No puede estar vacío
//    - Debe tener al menos 3 caracteres
//    Si hay error: agregá clase "error" al input y mostrá el mensaje en #error-nombre
//    Si es válido: agregá clase "valido" y ocultá el mensaje de error
//
// 2. Campo "email":
//    - No puede estar vacío
//    - Debe contener "@" y "."
//    TIP: podés usar includes("@") o una regex simple: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//
// 3. Campo "password":
//    - No puede estar vacío
//    - Debe tener al menos 8 caracteres
//
// VALIDACIÓN EN SUBMIT:
//
// 4. Agregá un listener al evento "submit" del formulario.
//    Usá preventDefault() para evitar que recargue la página.
//    Validá los tres campos. Si alguno falla, mostrá sus errores y NO enviés.
//    Si todos son válidos:
//      - Mostrá el <div#exito> (agregale la clase "visible")
//      - Ocultá el formulario
//
// TIP: para mostrar u ocultar los mensajes de error:
//      error.classList.add("visible")    →  muestra el mensaje
//      error.classList.remove("visible") →  lo oculta
//
// TIP: para marcar un campo como válido o inválido:
//      input.classList.add("error")      →  borde rojo
//      input.classList.add("valido")     →  borde verde
//      (acordate de quitar la clase contraria antes de agregar la nueva)

const MIN_CARACTERES_NOMBRE = 3;
const MIN_CARACTERES_PASSWORD = 8;
const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formulario = document.querySelector("#form-registro");
const exito = document.querySelector("#exito");

// Cada validador recibe el valor y devuelve el mensaje de error ("" si es válido)
function validarNombre(valor) {
  const nombre = valor.trim();
  if (nombre === "") return "El nombre es obligatorio";
  if (nombre.length < MIN_CARACTERES_NOMBRE) {
    return `El nombre debe tener al menos ${MIN_CARACTERES_NOMBRE} caracteres`;
  }
  return "";
}

function validarEmail(valor) {
  const email = valor.trim();
  if (email === "") return "El email es obligatorio";
  if (!FORMATO_EMAIL.test(email)) return "Ingresá un email válido (debe contener @ y .)";
  return "";
}

function validarPassword(valor) {
  if (valor === "") return "La contraseña es obligatoria";
  if (valor.length < MIN_CARACTERES_PASSWORD) {
    return `La contraseña debe tener al menos ${MIN_CARACTERES_PASSWORD} caracteres`;
  }
  return "";
}

const campos = [
  { input: document.querySelector("#nombre"), error: document.querySelector("#error-nombre"), validar: validarNombre },
  { input: document.querySelector("#email"), error: document.querySelector("#error-email"), validar: validarEmail },
  { input: document.querySelector("#password"), error: document.querySelector("#error-password"), validar: validarPassword },
];

// Valida un campo, refleja el resultado en el DOM y devuelve true si es válido
function validarCampo({ input, error, validar }) {
  const mensajeError = validar(input.value);

  if (mensajeError) {
    input.classList.remove("valido");
    input.classList.add("error");
    error.textContent = mensajeError;
    error.classList.add("visible");
    return false;
  }

  input.classList.remove("error");
  input.classList.add("valido");
  error.textContent = "";
  error.classList.remove("visible");
  return true;
}

// Validación campo por campo al salir de él
campos.forEach((campo) => {
  campo.input.addEventListener("blur", () => validarCampo(campo));
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  // map valida los tres campos (así se muestran todos los errores a la vez)
  const todosValidos = campos.map(validarCampo).every(Boolean);
  if (!todosValidos) return;

  formulario.hidden = true;
  exito.classList.add("visible");
});
