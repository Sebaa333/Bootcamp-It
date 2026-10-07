// Ejercicio 10: Recorrer un objeto con for...in
//
// Definir el siguiente objeto con las calificaciones de un estudiante:
//
//     propiedad: matematica, valor: 8,
//     propiedad: historia, valor: 7,
//     propiedad: ingles, valor: 9,
//     propiedad: biologia, valor: 6,
//     propiedad: programacion, valor: 10
//     propiedad: arte, valor: 10
//   };
//
// Usando un bucle for...in, mostrá cada materia con su nota:
//   matematica: 8
//   historia: 7
//   ingles: 9
//   biologia: 6
//   programacion: 10
//   arte: 10
//
// Luego mostrá la cantidad de materias.
// Mostrá también el promedio de las calificaciones.
//
// TIP: for (let clave in objeto) — dentro del bucle accedé al valor con objeto[clave]
// Para contar propiedades: Object.keys(objeto).length

let calificaciones = {
  matematica: 8,
  historia: 7,
  ingles: 9,
  biologia: 6,
  programacion: 10,
  arte: 10
};

let sumaNotas = 0;
for (let materia in calificaciones) {
  console.log(`${materia}: ${calificaciones[materia]}`);
  sumaNotas += calificaciones[materia];
}

let cantidadMaterias = Object.keys(calificaciones).length;
let promedioNotas = sumaNotas / cantidadMaterias;

console.log(`Cantidad de materias: ${cantidadMaterias}`);
console.log(`Promedio: ${promedioNotas.toFixed(2)}`);
