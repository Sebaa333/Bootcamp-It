// Ejercicio 15: Funciones que reciben y retornan arrays
//
// Creá estas tres funciones:
//
//   1. obtenerPares(numeros)
//      Recibe un array de números y retorna un nuevo array solo con los pares.
//
//   2. invertirArray(array)
//      Recibe un array y retorna uno nuevo con los elementos en orden inverso.
//      No modificar el array original.
//
//   3. contarOcurrencias(array, elemento)
//      Retorna cuántas veces aparece el elemento en el array.
//
// Probá con:
//   let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
//   let letras  = ["a", "b", "a", "c", "a", "d"];
//
// Resultado esperado:
//   Pares: [ 2, 4, 6, 8, 10 ]
//   Invertido: [ 10, 9, 8, 7, 6, 5, 4, 3, 2, 1 ]
//   Ocurrencias de "a": 3
// *********Opcional:
//  Crear una función que reciba texto y una letra y retorne la cantidad de veces que aparece esa letra en el texto. Probar con un texto largo y distintas letras.

let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let letras  = ["a", "b", "a", "c", "a", "d"];

function obtenerPares(numeros) {
  return numeros.filter((numero) => numero % 2 === 0);
}

function invertirArray(array) {
  return [...array].reverse(); // copia para no mutar el original
}

function contarOcurrencias(array, elemento) {
  return array.filter((item) => item === elemento).length;
}

console.log("Pares:", obtenerPares(numeros));
console.log("Invertido:", invertirArray(numeros));
console.log(`Ocurrencias de "a": ${contarOcurrencias(letras, "a")}`);
console.log("Original sin modificar:", numeros);

// Opcional: contar una letra dentro de un texto
function contarLetraEnTexto(texto, letra) {
  return contarOcurrencias(texto.toLowerCase().split(""), letra.toLowerCase());
}

let textoLargo = "JavaScript es un lenguaje de programación muy versátil y popular para la web";
console.log(`Letra "a": ${contarLetraEnTexto(textoLargo, "a")}`);
console.log(`Letra "e": ${contarLetraEnTexto(textoLargo, "e")}`);
console.log(`Letra "j": ${contarLetraEnTexto(textoLargo, "J")}`);
