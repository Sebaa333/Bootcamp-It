// Ejercicio 6: Acordeón
//
// Abrí ejercicio6.html. Hay 4 preguntas frecuentes. Cada una tiene:
//   - Un <button class="acordeon-btn"> con el título de la pregunta
//   - Un <div class="acordeon-contenido"> con la respuesta (oculto por defecto)
//
// Implementá el comportamiento del acordeón:
//
// 1. Al hacer click en un botón:
//    a) Si el panel estaba CERRADO → abrilo (agregá clase "abierto" al botón Y al contenido)
//    b) Si el panel estaba ABIERTO → cerralo (quitá la clase "abierto" de ambos)
//    TIP: classList.toggle("abierto") maneja los dos casos en una sola línea.
//         Aplicalo tanto al botón como al contenido hermano.
//
// 2. COMPORTAMIENTO EXCLUSIVO (solo uno abierto a la vez):
//    Antes de abrir un panel, cerrá todos los demás.
//    TIP: seleccioná todos los botones y contenidos con querySelectorAll,
//         recorrelos con forEach y quitales la clase "abierto" a todos.
//         Después aplicá toggle solo al clickeado y su contenido.
//
// Para navegar del botón clickeado a su contenido hermano:
//   TIP: el contenido está justo después del botón dentro del mismo padre.
//        Podés acceder con: boton.nextElementSibling

const botones = document.querySelectorAll(".acordeon-btn");
const contenidos = document.querySelectorAll(".acordeon-contenido");

function cerrarTodos() {
  botones.forEach((boton) => boton.classList.remove("abierto"));
  contenidos.forEach((contenido) => contenido.classList.remove("abierto"));
}

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const contenido = boton.nextElementSibling;

    // El estado se lee ANTES de limpiar: después de cerrarTodos() ya no tendría la clase
    const estabaAbierto = boton.classList.contains("abierto");

    cerrarTodos();

    // Si estaba abierto queda cerrado; si estaba cerrado se abre con add (no toggle)
    if (!estabaAbierto) {
      boton.classList.add("abierto");
      contenido.classList.add("abierto");
    }
  });
});
