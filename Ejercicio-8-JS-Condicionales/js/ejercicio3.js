/*
  Ejercicio 3: Día de la semana
  ==============================
  Pedir al usuario que ingrese un valor de día entre 1 y 7 y almacenarla en una variable `numeroDia`.

  Mostrar el nombre del día correspondiente:
    - 1 → "Lunes"
    - 2 → "Martes"
    - 3 → "Miércoles"
    - 4 → "Jueves"
    - 5 → "Viernes"
    - 6 → "Sábado"
    - 7 → "Domingo"
    - Otro número → "Día inválido"

  Si el usuario ingresa 3, el resultado esperado es:

  Resultado esperado:
    Miércoles

  Requisitos técnicos:
    - Usar switch / case con default
    - Cubrir los 7 días más el caso default
*/

const numeroDia = Number(prompt("Ingresá un número de día entre 1 y 7:"));

switch (numeroDia) {
  case 1:
    console.log("Lunes");
    break;
  case 2:
    console.log("Martes");
    break;
  case 3:
    console.log("Miércoles");
    break;
  case 4:
    console.log("Jueves");
    break;
  case 5:
    console.log("Viernes");
    break;
  case 6:
    console.log("Sábado");
    break;
  case 7:
    console.log("Domingo");
    break;
  default:
    console.log("Día inválido");
}
