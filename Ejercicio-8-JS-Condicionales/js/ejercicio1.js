/*
  Ejercicio 1: Categoría de edad
  ================================
  Pedir al usuario que ingrese su edad y guardar este valor en una variable.

  Mostrar por consola la categoría correspondiente según estos rangos:
    - Menor a 13           → "Niño/a"
    - Entre 13 y 17 (inc) → "Adolescente"
    - Entre 18 y 64 (inc) → "Adulto/a"
    - 65 o más             → "Adulto/a mayor"

  let edad = 45;

  Resultado esperado:
    Adulto/a

  Requisitos técnicos:
    - Usar if / else if / else con 4 ramas
    - Los rangos deben ser mutuamente excluyentes (sin superposición)
    - Usar >= y <= para los rangos intermedios
*/

const edad = Number(prompt("Ingresá tu edad:"));

if (edad < 13) {
  console.log("Niño/a");
} else if (edad >= 13 && edad <= 17) {
  console.log("Adolescente");
} else if (edad >= 18 && edad <= 64) {
  console.log("Adulto/a");
} else {
  console.log("Adulto/a mayor");
}
