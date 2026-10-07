// Ejercicio 5: Sumar y promediar
//
// Tenés este array:
//
//   let notas = [7, 9, 5, 8, 6, 10, 4];
//
// Calculá y mostrá:
//   1. La suma de todas las notas (usando un for)
//   2. El promedio redondeado a 2 decimales
//   3. Si el promedio es >= 6 → "Aprobado", si no → "Reprobado"
//
// Resultado esperado:
//   Suma: 49
//   Promedio: 7.00
//   Estado: Aprobado

let notas = [7, 9, 5, 8, 6, 10, 4];

let suma = 0;
for (let i = 0; i < notas.length; i++) {
  suma += notas[i];
}

let promedio = suma / notas.length;
let estado = promedio >= 6 ? "Aprobado" : "Reprobado";

console.log(`Suma: ${suma}`);
console.log(`Promedio: ${promedio.toFixed(2)}`);
console.log(`Estado: ${estado}`);
