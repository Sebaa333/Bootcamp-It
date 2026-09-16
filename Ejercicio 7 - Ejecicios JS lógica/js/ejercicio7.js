/*
  ============ EJERCICIO 7: PAGO EN CUOTAS ============
  Pedir al usuario que ingrese el importe de su compra.
  Pedir además la cantidad de cuotas en las que desea pagar.

  Calcular el importe de cada cuota teniendo en cuenta que el interés por realizar el pago en cuotas es del 20% sobre el importe total de la compra.

  Mostrar por consola el importe total de la compra, el interés aplicado, y el importe de cada cuota.
*/

const importeCompra = Number(prompt("Ingresá el importe de tu compra:"));
const cantidadCuotas = Number(prompt("Ingresá la cantidad de cuotas:"));

const porcentajeInteres = 20;
const interesAplicado = (importeCompra * porcentajeInteres) / 100;
const importeTotal = importeCompra + interesAplicado;
const importePorCuota = importeTotal / cantidadCuotas;

console.log(`Importe de la compra: $${importeCompra.toFixed(2)}`);
console.log(`Interés aplicado: $${interesAplicado.toFixed(2)}`);
console.log(`Importe total de la compra: $${importeTotal.toFixed(2)}`);
console.log(`Cantidad de cuotas: ${cantidadCuotas}`);
console.log(`Importe de cada cuota: $${importePorCuota.toFixed(2)}`);
