/*
  Ejercicio 7: Múltiplo de 3 o 5
  ================================
  Pedir al usuario que ingrese un número y almacenarlo en una variable `numero`.
  Transformar el valor ingresado a un número usando Number() o parseInt().

  Verificar si el usuario ingresó un valor numérico válido. Si no es así, mostrar un mensaje de error.

  Mensaje de error esperado:
    El valor ingresado no es un número válido.

  De no ser así, continuar con la verificación de múltiplos.

  Determinar si el número es múltiplo de 3, de 5, de ambos, o de ninguno.

  let numero = 15;

  Resultados posibles:
    "15 es múltiplo de 3 y de 5."
    "9 es múltiplo de 3."
    "10 es múltiplo de 5."
    "7 no es múltiplo de 3 ni de 5."

  Requisitos técnicos:
    - Usar % para verificar si es múltiplo
*/

const valorIngresado = prompt("Ingresá un número:");
const numero = Number(valorIngresado);

// Number("") and Number(null) return 0, so an empty or cancelled input must be checked explicitly.
const valorVacio = valorIngresado === null || valorIngresado.trim() === "";

if (valorVacio || Number.isNaN(numero)) {
  console.log("El valor ingresado no es un número válido.");
} else {
  const esMultiploDe3 = numero % 3 === 0;
  const esMultiploDe5 = numero % 5 === 0;

  if (esMultiploDe3 && esMultiploDe5) {
    console.log(`${numero} es múltiplo de 3 y de 5.`);
  } else if (esMultiploDe3) {
    console.log(`${numero} es múltiplo de 3.`);
  } else if (esMultiploDe5) {
    console.log(`${numero} es múltiplo de 5.`);
  } else {
    console.log(`${numero} no es múltiplo de 3 ni de 5.`);
  }
}
