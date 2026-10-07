// Ejercicio 4: Recorrer un array con for
//
// Tenés este array:
//
//   let temperaturas = [22, 18, 30, 15, 27, 10, 35];
//
// Usando un bucle for clásico, mostrá cada temperatura con este formato:
//   Día 1: 22°C
//   Día 2: 18°C
//   ...
//
// Después del bucle, mostrá también:
//   - La temperatura más alta
//   - La temperatura más baja
//
// TIP: Math.max(...array) y Math.min(...array) te dan el máximo y mínimo de un array.

let temperaturas = [22, 18, 30, 15, 27, 10, 35];

for (let i = 0; i < temperaturas.length; i++) {
  console.log(`Día ${i + 1}: ${temperaturas[i]}°C`);
}

let temperaturaMaxima = Math.max(...temperaturas);
let temperaturaMinima = Math.min(...temperaturas);

console.log(`Temperatura más alta: ${temperaturaMaxima}°C`);
console.log(`Temperatura más baja: ${temperaturaMinima}°C`);
