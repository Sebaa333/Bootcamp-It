/*
  ============ EJERCICIO OPCIONAL: PRESUPUESTO PARA PINTAR UNA HABITACIÓN ============

  Pedir al usuario que ingrese:

  - El largo de la habitación
  - El ancho de la habitación
  - La altura de las paredes
  - El precio de un litro de pintura

  - Crear otra variable llamada `rendimientoPorLitro` y asignarle el valor de 6, que representa la cantidad de metros cuadrados que se pueden pintar con un litro de pintura.

  Calcular:

  - El perímetro de la habitación
  - La cantidad de metros cuadrados de pared
  - La cantidad de litros de pintura necesarios
  - El costo total de la pintura

  Fórmulas sugeridas:

  perímetro = 2 x (largo + ancho)
  metrosCuadradosPared = perímetro x altura
  litrosNecesarios = metrosCuadradosPared / rendimientoPorLitro
  costoTotal = litrosNecesarios x precioPorLitro

  Mostrar por consola:

  Perímetro de la habitación: 18 metros
  Metros cuadrados de pared: 45 m2
  Litros necesarios: 7.5
  Costo total de pintura: $37500

  Antes de mostrar el alert(), usar confirm():

  ¿Deseás ver el resumen del presupuesto?

  Guardar la respuesta en una variable llamada `quiereVerResumen`.

  Mostrar por consola el valor de esa variable.

  Importante:
  Todavía no hace falta usar if/else.
  El confirm() solamente se guarda como true o false.

  Extra:
  Redondear los litros necesarios y el costo total a dos decimales.
*/

// Atención: el enunciado exige la variable `quiereVerResumen`, y el ejercicio 10
// también la exige. Como todos los scripts comparten el mismo scope global,
// ejercicio8.js y ejercicio10.js no pueden estar activos a la vez en index.html:
// comentá uno de los dos <script> para probar el otro.

const largoHabitacion = Number(prompt("Ingresá el largo de la habitación (en metros):"));
const anchoHabitacion = Number(prompt("Ingresá el ancho de la habitación (en metros):"));
const alturaPared = Number(prompt("Ingresá la altura de las paredes (en metros):"));
const precioPorLitro = Number(prompt("Ingresá el precio de un litro de pintura:"));

const rendimientoPorLitro = 6;

const perimetroHabitacion = 2 * (largoHabitacion + anchoHabitacion);
const metrosCuadradosPared = perimetroHabitacion * alturaPared;
const litrosNecesariosPintura = metrosCuadradosPared / rendimientoPorLitro;
const costoTotalPintura = litrosNecesariosPintura * precioPorLitro;

const litrosRedondeados = Math.round(litrosNecesariosPintura * 100) / 100;
const costoTotalRedondeado = Math.round(costoTotalPintura * 100) / 100;

console.log(`Perímetro de la habitación: ${perimetroHabitacion} metros`);
console.log(`Metros cuadrados de pared: ${metrosCuadradosPared} m2`);
console.log(`Litros necesarios: ${litrosRedondeados}`);
console.log(`Costo total de pintura: $${costoTotalRedondeado}`);

const quiereVerResumen = confirm("¿Deseás ver el resumen del presupuesto?");

console.log(`¿El usuario quiso ver el resumen?: ${quiereVerResumen}`);

alert(`Resumen del presupuesto:
Perímetro de la habitación: ${perimetroHabitacion} metros
Metros cuadrados de pared: ${metrosCuadradosPared} m2
Litros necesarios: ${litrosRedondeados}
Costo total de pintura: $${costoTotalRedondeado}`);

