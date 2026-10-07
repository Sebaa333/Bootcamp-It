// Ejercicio 6: slice y splice
//
// Tenés este array:
//
//   let letras = ["a", "b", "c", "d", "e", "f", "g"];
//
// Realizá estas operaciones y mostrá el resultado de cada una:
//   1. Extraé los elementos del índice 2 al 4 (sin modificar el original) con .slice()
//   2. Confirmá que el array original no cambió
//   3. Eliminá 2 elementos a partir del índice 3 con .splice() y mostrá lo eliminado
//   4. Mostrá el array después del splice
//
// Resultado esperado:
//   Extraído: [ 'c', 'd', 'e' ]
//   Original intacto: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]
//   Eliminado: [ 'd', 'e' ]
//   Array resultante: [ 'a', 'b', 'c', 'f', 'g' ]
//
// TIP: .slice(inicio, fin) NO modifica el original; el índice fin es EXCLUSIVO.
//      .splice(inicio, cantidad) SÍ modifica el array y retorna lo eliminado.

let letras = ["a", "b", "c", "d", "e", "f", "g"];

let extraido = letras.slice(2, 5);
console.log("Extraído:", extraido);
console.log("Original intacto:", letras);

let eliminado = letras.splice(3, 2);
console.log("Eliminado:", eliminado);
console.log("Array resultante:", letras);
