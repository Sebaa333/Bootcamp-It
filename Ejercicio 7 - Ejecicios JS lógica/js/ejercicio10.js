/*
  ============ EJERCICIO 10: PRESUPUESTO MENSUAL PERSONAL ============

  Pedir al usuario que ingrese:

  - Su ingreso mensual
  - Gasto en alquiler
  - Gasto en comida
  - Gasto en transporte
  - Gasto en servicios
  - Gasto en entretenimiento

  Calcular:

  - El total de gastos mensuales
  - El dinero restante al finalizar el mes
  - El porcentaje del ingreso que fue utilizado en gastos

  Antes de mostrar el resultado, usar confirm() con el siguiente mensaje:

  ¿Deseás ver el resumen de tu presupuesto mensual?

  Guardar la respuesta en una variable llamada `quiereVerResumen`.

  Mostrar por consola:

  Ingreso mensual: $500000
  Total de gastos: $350000
  Dinero restante: $150000
  Porcentaje gastado: 70%
  ¿El usuario quiso ver el resumen?: true

  Mostrar también un alert() con el resumen del presupuesto.

  Importante:
  En este ejercicio todavía no hace falta usar if/else.
  El valor de confirm() se guarda y se muestra como true o false.

  Extra:
  Redondear el porcentaje gastado a dos decimales.
*/

// Atención: el enunciado exige la variable `quiereVerResumen`, y el ejercicio 8
// también la exige. Como todos los scripts comparten el mismo scope global,
// ejercicio8.js y ejercicio10.js no pueden estar activos a la vez en index.html:
// comentá uno de los dos <script> para probar el otro.

const ingresoMensual = Number(prompt("Ingresá tu ingreso mensual:"));
const gastoAlquiler = Number(prompt("Ingresá tu gasto en alquiler:"));
const gastoComida = Number(prompt("Ingresá tu gasto en comida:"));
const gastoTransporte = Number(prompt("Ingresá tu gasto en transporte:"));
const gastoServicios = Number(prompt("Ingresá tu gasto en servicios:"));
const gastoEntretenimiento = Number(prompt("Ingresá tu gasto en entretenimiento:"));

const totalGastos = gastoAlquiler + gastoComida + gastoTransporte + gastoServicios + gastoEntretenimiento;
const dineroRestante = ingresoMensual - totalGastos;
const porcentajeGastado = Math.round(((totalGastos * 100) / ingresoMensual) * 100) / 100;

const quiereVerResumen = confirm("¿Deseás ver el resumen de tu presupuesto mensual?");

console.log(`Ingreso mensual: $${ingresoMensual}`);
console.log(`Total de gastos: $${totalGastos}`);
console.log(`Dinero restante: $${dineroRestante}`);
console.log(`Porcentaje gastado: ${porcentajeGastado}%`);
console.log(`¿El usuario quiso ver el resumen?: ${quiereVerResumen}`);

alert(`Resumen de tu presupuesto mensual:
Ingreso mensual: $${ingresoMensual}
Total de gastos: $${totalGastos}
Dinero restante: $${dineroRestante}
Porcentaje gastado: ${porcentajeGastado}%`);

