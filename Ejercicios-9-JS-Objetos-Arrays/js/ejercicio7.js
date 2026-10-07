// Ejercicio 7: Primer contacto con objetos
//
// Creá un objeto llamado "persona" con estas propiedades:
//   - nombre: "Valentina"
//   - edad: 28
//   - profesion: "diseñadora"
//   - estaEmpleada: true
//
// Mostrá por consola:
//   1. El objeto completo
//   2. El nombre
//   3. La edad
//   4. Esta frase: "Valentina tiene 28 años y es diseñadora."
//   5. Agregá una nueva propiedad "hobbies" con un array de 3 hobbies y mostrá el resultado
//   6. Modificá la propiedad "estaEmpleada" a false y mostrá el resultado
//
// Resultado esperado:
//   { nombre: 'Valentina', edad: 28, profesion: 'diseñadora', estaEmpleada: true }
//   Valentina
//   28
//   Valentina tiene 28 años y es diseñadora.
//   { nombre: 'Valentina', edad: 28, profesion: 'diseñadora', estaEmpleada: true, hobbies: [ 'leer', 'viajar', 'cocinar' ] }
//   { nombre: 'Valentina', edad: 28, profesion: 'diseñadora', estaEmpleada: false, hobbies: [ 'leer', 'viajar', 'cocinar' ] }

let persona = {
  nombre: "Valentina",
  edad: 28,
  profesion: "diseñadora",
  estaEmpleada: true
};

console.log(persona);
console.log(persona.nombre);
console.log(persona.edad);
console.log(`${persona.nombre} tiene ${persona.edad} años y es ${persona.profesion}.`);

persona.hobbies = ["leer", "viajar", "cocinar"];
console.log(persona);

persona.estaEmpleada = false;
console.log(persona);
