// Ejercicio 3: Buscar en un array
//
// Tenés este array:
//
//   let nombres = ["Ana", "Bruno", "Camila", "Diego", "Elena"];
//
// Mostrá por consola:
//   1. Si "Camila" está en el array (true o false)
//   2. El índice donde se encuentra "Diego"
//   3. Si "Lucas" está en el array
//   4. El índice de "Lucas" — ¿qué devuelve cuando no existe?
//
// Resultado esperado:
//   true
//   3
//   false
//   -1

let nombres = ["Ana", "Bruno", "Camila", "Diego", "Elena"];

console.log(nombres.includes("Camila"));
console.log(nombres.indexOf("Diego"));
console.log(nombres.includes("Lucas"));
console.log(nombres.indexOf("Lucas")); // -1 cuando el elemento no existe
