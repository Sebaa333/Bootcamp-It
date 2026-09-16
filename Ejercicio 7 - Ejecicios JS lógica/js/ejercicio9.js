/*
  ============ EJERCICIO 9: CALCULADORA DE VIAJE ============

  Pedir al usuario que ingrese:

  - La cantidad de kilómetros que va a viajar
  - Cuántos kilómetros recorre el vehículo con 1 litro de combustible
  - El precio del litro de combustible
  - La cantidad de personas que viajan

  Calcular:

  - Cuántos litros de combustible necesita para el viaje
  - Cuánto dinero gastará en combustible
  - Cuánto debería pagar cada persona si dividen el gasto en partes iguales

  Mostrar por consola:

  Kilómetros del viaje: 300 km
  Rendimiento del vehículo: 12 km por litro
  Litros necesarios: 25
  Costo total del combustible: $27500
  Costo por persona: $6875

  Mostrar también el resultado final usando alert().

  Extra:
  Redondear los litros necesarios y el costo por persona a dos decimales.
*/

const kilometrosViaje = Number(prompt("Ingresá la cantidad de kilómetros del viaje:"));
const kilometrosPorLitro = Number(prompt("Ingresá cuántos kilómetros recorre el vehículo con 1 litro:"));
const precioLitroCombustible = Number(prompt("Ingresá el precio del litro de combustible:"));
const cantidadPersonas = Number(prompt("Ingresá la cantidad de personas que viajan:"));

const litrosNecesariosCombustible = kilometrosViaje / kilometrosPorLitro;
const costoTotalCombustible = litrosNecesariosCombustible * precioLitroCombustible;
const costoPorPersona = costoTotalCombustible / cantidadPersonas;

const litrosCombustibleRedondeados = Math.round(litrosNecesariosCombustible * 100) / 100;
const costoPorPersonaRedondeado = Math.round(costoPorPersona * 100) / 100;

console.log(`Kilómetros del viaje: ${kilometrosViaje} km`);
console.log(`Rendimiento del vehículo: ${kilometrosPorLitro} km por litro`);
console.log(`Litros necesarios: ${litrosCombustibleRedondeados}`);
console.log(`Costo total del combustible: $${costoTotalCombustible}`);
console.log(`Costo por persona: $${costoPorPersonaRedondeado}`);

alert(`Resultado del viaje:
Litros necesarios: ${litrosCombustibleRedondeados}
Costo total del combustible: $${costoTotalCombustible}
Costo por persona: $${costoPorPersonaRedondeado}`);

