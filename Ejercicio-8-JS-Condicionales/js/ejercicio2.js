/*
  Ejercicio 2: Semáforo
  ======================
  Crear una variable llamada `colorSemaforo` con uno de estos valores posibles:
  "rojo", "amarillo", "verde".

  Mostrar la instrucción correspondiente:
    - "rojo"     → "Detener"
    - "amarillo" → "Precaución"
    - "verde"    → "Avanzar"
    - Otro valor → "Color inválido"

  let colorSemaforo = "verde";

  Resultado esperado:
    Avanzar

  Requisitos técnicos:
    - Usar switch / case con un default
    - No usar if / else en este ejercicio
*/

let colorSemaforo = "verde";

switch (colorSemaforo) {
  case "rojo":
    console.log("Detener");
    break;
  case "amarillo":
    console.log("Precaución");
    break;
  case "verde":
    console.log("Avanzar");
    break;
  default:
    console.log("Color inválido");
}
