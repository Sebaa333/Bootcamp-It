// Ejercicio 1: textContent, innerHTML y classList
//
// Abrí ejercicio1.html en el navegador y trabajá desde este archivo.
// El HTML ya tiene un título, una descripción y tres tarjetas de personas.
//
// Hacé lo siguiente usando JavaScript:
//
// 1. Cambiá el texto del <h1#titulo> a "Equipo de trabajo"
//    TIP: usá textContent, NO innerHTML — textContent es más seguro para texto plano
//
// 2. Cambiá el contenido de <p#descripcion> por este HTML:
//       "Conocé a nuestro equipo. <strong>Somos 3 integrantes.</strong>"
//    TIP: acá sí tenés que usar innerHTML porque el contenido incluye una etiqueta <strong>
//
// 3. Agregá la clase "destacado" a la tarjeta con id "tarjeta-1"
//    TIP: classList.add("nombre-de-clase")
//
// 4. Agregá la clase "inactivo" a la tarjeta con id "tarjeta-3"
//
// 5. Usando querySelectorAll, seleccioná TODOS los elementos con clase "nombre"
//    y convertí cada texto a mayúsculas.
//    TIP: querySelectorAll retorna una NodeList. Podés recorrerla con forEach.
//         Para convertir a mayúsculas: elemento.textContent.toUpperCase()
//
// 6. Toggleá la clase "oculto" sobre la tarjeta-2 dos veces seguidas.
//    ¿Qué observás? Explicalo con un comentario.
//    TIP: classList.toggle("nombre-de-clase")
//
// Resultado esperado al abrir el HTML:
//   - El título dice "Equipo de trabajo"
//   - La descripción tiene el texto con "Somos 3 integrantes." en negrita
//   - La tarjeta 1 tiene fondo amarillo (clase "destacado")
//   - La tarjeta 3 se ve semitransparente (clase "inactivo")
//   - Los tres nombres están en mayúsculas

const titulo = document.querySelector("#titulo");
const descripcion = document.querySelector("#descripcion");
const tarjeta1 = document.querySelector("#tarjeta-1");
const tarjeta2 = document.querySelector("#tarjeta-2");
const tarjeta3 = document.querySelector("#tarjeta-3");

// 1. Texto plano: textContent
titulo.textContent = "Equipo de trabajo";

// 2. Contenido con una etiqueta real: innerHTML
descripcion.innerHTML = "Conocé a nuestro equipo. <strong>Somos 3 integrantes.</strong>";

// 3 y 4. Clases que cambian el aspecto de las tarjetas
tarjeta1.classList.add("destacado");
tarjeta3.classList.add("inactivo");

// 5. Todos los nombres en mayúsculas
document.querySelectorAll(".nombre").forEach((nombre) => {
  nombre.textContent = nombre.textContent.toUpperCase();
});

// 6. Dos toggle seguidos sobre la tarjeta 2.
// Observación: el primer toggle AGREGA la clase "oculto" y el segundo la QUITA,
// así que la tarjeta termina exactamente en su estado original (visible).
// Como ambos se ejecutan en el mismo instante, el navegador ni siquiera llega
// a pintar el estado intermedio: no se ve ningún cambio en pantalla.
tarjeta2.classList.toggle("oculto");
tarjeta2.classList.toggle("oculto");
