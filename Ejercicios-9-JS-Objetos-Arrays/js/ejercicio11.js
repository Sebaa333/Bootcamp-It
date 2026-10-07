// Ejercicio 11: Objeto con método
//
// Completá los métodos de este objeto para que funcionen correctamente, primero definiendo el objeto y luego mostrá el resultado por consola:
//
//     Propiedades:
//      base: 8,
//      altura: 5,
//     Métodos:
//      calcularArea: function() { ... },
//      calcularPerimetro: function() { ... }
//
//
// - calcularArea() debe retornar base * altura
// - calcularPerimetro() debe retornar 2 * (base + altura)
//
// Mostrá por consola:
//   Área: 40
//   Perímetro: 26
//
// TIP: dentro de un método, usá "this" para acceder a las propiedades
//      del propio objeto. Por ejemplo: this.base

let rectangulo = {
  base: 8,
  altura: 5,
  calcularArea: function () {
    return this.base * this.altura;
  },
  calcularPerimetro: function () {
    return 2 * (this.base + this.altura);
  }
};

console.log(`Área: ${rectangulo.calcularArea()}`);
console.log(`Perímetro: ${rectangulo.calcularPerimetro()}`);
