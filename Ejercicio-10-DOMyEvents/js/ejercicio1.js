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
