/*
  Ejercicio 8: Aprobación de préstamo
  =====================================
  Variables de base:
    let ingresos = 80000;
    let tieneDeudas = false;
    let antiguedadLaboral = 3;

  Un préstamo se aprueba si:
    - Los ingresos son mayores a 50000, Y
    - No tiene deudas (!tieneDeudas), Y
    - Tiene al menos 2 años de antigüedad laboral

  Mostrar por consola si el préstamo fue aprobado o rechazado.
*/

let ingresos = 80000;
let tieneDeudas = false;
let antiguedadLaboral = 3;

if (ingresos > 50000 && !tieneDeudas && antiguedadLaboral >= 2) {
  console.log("Préstamo aprobado.");
} else {
  console.log("Préstamo rechazado.");
}
