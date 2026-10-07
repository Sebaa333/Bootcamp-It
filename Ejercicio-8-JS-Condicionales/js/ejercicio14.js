/*
  Ejercicio 20: Calculadora con operador
  ========================================
  Pedir al usuario que ingrese 2 números y un operador matemático, luego mostrar el resultado de la operación.
  Crear tres variables: `numero1`, `operador` y `numero2`.

  Realizar la operación matemática indicada por `operador` y mostrar el resultado.

  const numero1 = 10;
  const operador = "*";
  const numero2 = 5;

  Resultado esperado:
    10 * 5 = 50

  Operadores posibles: "+", "-", "*", "/"

  Si el operador no existe:
    Operador no reconocido.

  Si el operador es "/" y numero2 es 0:
    No se puede dividir por cero.

  Requisitos técnicos:
    - Usar switch / case para seleccionar la operación
    - Verificar la división por cero dentro del case "/"
    - Usar template literal para mostrar el resultado: "10 * 5 = 50"
*/

const numero1 = Number(prompt("Ingresá el primer número:"));
const operador = prompt("Ingresá un operador (+, -, *, /):");
const numero2 = Number(prompt("Ingresá el segundo número:"));

switch (operador) {
  case "+":
    console.log(`${numero1} + ${numero2} = ${numero1 + numero2}`);
    break;
  case "-":
    console.log(`${numero1} - ${numero2} = ${numero1 - numero2}`);
    break;
  case "*":
    console.log(`${numero1} * ${numero2} = ${numero1 * numero2}`);
    break;
  case "/":
    if (numero2 === 0) {
      console.log("No se puede dividir por cero.");
    } else {
      console.log(`${numero1} / ${numero2} = ${numero1 / numero2}`);
    }
    break;
  default:
    console.log("Operador no reconocido.");
}
