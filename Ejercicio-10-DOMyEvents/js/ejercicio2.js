// Ejercicio 2: createElement, appendChild y remove
//
// Abrí ejercicio2.html en el navegador. El HTML tiene una lista vacía <ul#lista>.
//
// Tenés este array de tareas:
//
//   let tareas = ["Estudiar DOM", "Practicar eventos", "Hacer el proyecto", "Repasar array methods"];
//  Es importante ir resolviendo cada punto de a uno, probando el resultado en el navegador antes de pasar al siguiente. De lo contrario, si algo no funciona, no vas a saber dónde está el error.
// 1. Recorriendo el array con forEach, creá un <li> por cada tarea y agregalo
//    a <ul#lista>. Cada <li> debe mostrar el texto de la tarea.
//    TIP: el flujo es siempre el mismo:
//         a) Crear el elemento li:      createElement("tipoDeElemnto")
//         b) Asignar contenido:      textContent o innerText
//         c) Agregarlo al padre:     appendChild(elementoHijo)
//
// 2. Eliminá el PRIMER <li> de la lista usando remove().
//    TIP: para seleccionar el primer hijo de un elemento: padre.querySelector("li")
//         o también: padre.firstElementChild
//
// 3. Creá un nuevo <li> con el texto "Repasar HTML semántico"
//    e insertalo AL PRINCIPIO de la lista (antes del primer ítem actual).
//    TIP: insertAdjacentHTML o insertBefore. Investigá cuál te resulta más claro.
//
// Resultado esperado al abrir el HTML:
//   - "Repasar HTML semántico"  ← nuevo, al principio
//   - "Practicar eventos"
//   - "Hacer el proyecto"
//   - "Repasar array methods"

let tareas = ["Estudiar DOM", "Practicar eventos", "Hacer el proyecto", "Repasar array methods"];

const lista = document.querySelector("#lista");

// 1. Render de cada tarea: createElement -> textContent -> appendChild
tareas.forEach((tarea) => {
  const li = document.createElement("li");
  li.textContent = tarea;
  lista.appendChild(li);
});

// 2. Eliminar el primer <li>
lista.firstElementChild.remove();

// 3. Insertar el nuevo <li> al principio de la lista
lista.insertAdjacentHTML("afterbegin", "<li>Repasar HTML semántico</li>");
