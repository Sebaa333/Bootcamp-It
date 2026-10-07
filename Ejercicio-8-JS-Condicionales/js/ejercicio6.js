/*
  Ejercicio 6: Acceso con rol
  ============================
  Crear dos variables: `rol` y `estaActivo`.

  Un usuario puede acceder al panel si:
    - Su rol es "admin", Y
    - Su cuenta está activa

  let rol = "admin";
  let estaActivo = true;

  Resultado esperado:
    Acceso permitido.

*/

let rol = "admin";
let estaActivo = true;

if (rol === "admin" && estaActivo) {
  console.log("Acceso permitido.");
} else {
  console.log("Acceso denegado.");
}
