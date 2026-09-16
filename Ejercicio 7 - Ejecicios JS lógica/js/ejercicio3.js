/*
========= Ejercicio 3: Área y perímetro de un rectángulo =========
  
Crear dos variables:
const base = 10;
const altura = 5;

A. Calcular el área de un rectángulo usando la fórmula base x altura y guardar el resultado en una variable llamada área.
      Mostrar por consola: 
      El área del rectángulo es: XX

B. Calcular el perímetro de un rectángulo usando la fórmula:  2 x (base + altura) y guardar el resultado en una variable llamada perimetro
      Mostrar por consola:
      El perímetro del rectángulo es: XX

Testear el programa con diferentes valores para base y altura y comprobar que los resultados son correctos.

*/

const base = 10;
const altura = 5;

const area = base * altura;
const perimetro = 2 * (base + altura);

console.log(`El área del rectángulo es: ${area}`);
console.log(`El perímetro del rectángulo es: ${perimetro}`);
