# Ejercicio 11 - DOM y Events en JavaScript

## Descripción

Hasta ahora todo tu código vivió en la consola. En este ejercicio das el salto al navegador: aprendés a **leer y modificar el HTML desde JavaScript**, y a **responder a las acciones del usuario** mediante eventos.

Este es el puente entre "JS puro" y "JS que construye interfaces". Todo lo que hagas de acá en adelante — incluyendo React — se apoya en estos fundamentos. Si el DOM no está claro, nada de lo que viene va a tener base sólida.

Cada ejercicio tiene su propio archivo HTML con la estructura ya armada. Tu trabajo es escribir el JS que le da vida.

---

## Objetivos de Aprendizaje

Al completar este ejercicio, demostrarás dominio en:

- **Seleccionar elementos** del DOM con `querySelector` y `querySelectorAll`
- **Leer y modificar contenido** con `textContent` e `innerHTML`
- **Manipular clases** con `classList.add`, `.remove` y `.toggle`
- **Leer atributos `data-*`** con `dataset`
- **Crear y eliminar elementos** dinámicamente con `createElement`, `appendChild`, `insertAdjacentHTML` y `remove`
- **Responder a eventos** con `addEventListener`: `click`, `input`, `blur`, `submit`
- **Prevenir el comportamiento por defecto** de formularios con `preventDefault`
- **Event delegation**: manejar eventos de elementos dinámicos desde el padre
- **Estado en JS**: mantener el array como fuente de verdad y reflejar cambios en el DOM

---

## Estructura del Proyecto

```
11 - Ejercicios DOM y Events/
├── ejercicio1.html
├── ejercicio2.html
├── ejercicio3.html
├── ejercicio4.html
├── ejercicio5.html
├── ejercicio6.html
├── ejercicio7.html
├── ejercicio8.html
├── ejercicio9.html
└── js/
    ├── ejercicio1.js
    ├── ejercicio2.js
    ├── ejercicio3.js
    ├── ejercicio4.js
    ├── ejercicio5.js
    ├── ejercicio6.js
    ├── ejercicio7.js
    ├── ejercicio8.js
    └── ejercicio9.js
```

> Cada HTML ya está creado y enlazado a su JS. Solo tenés que escribir código en los archivos `.js`.

---

## Instrucciones Generales

1. **No modificar el HTML** salvo que el enunciado lo indique explícitamente.
2. Abrí cada HTML directamente en el navegador (doble click o Live Server en VS Code).
3. Usá la **consola del navegador** (F12) para ver errores y hacer pruebas.
4. No uses `alert()` — todo el feedback visual va en el DOM.

---

## Conceptos Clave Antes de Empezar

### Seleccionar elementos

```js
// Un solo elemento (el primero que coincida)
const titulo = document.querySelector("#titulo");
const btn    = document.querySelector(".btn-principal");

// Múltiples elementos — retorna NodeList (recorrible con forEach)
const items = document.querySelectorAll(".item");
items.forEach(item => console.log(item.textContent));
```

> `getElementById` y `getElementsByClassName` existen pero son antiguos. Usá siempre `querySelector` / `querySelectorAll`.

---

### Leer y modificar contenido

```js
// textContent: texto plano — más seguro, no interpreta HTML
elemento.textContent = "Nuevo texto";

// innerHTML: interpreta HTML — usalo solo cuando necesitás etiquetas
elemento.innerHTML = "Texto con <strong>negrita</strong>";
```

> Regla práctica: `textContent` para texto, `innerHTML` para HTML. Nunca al revés.

---

### classList

```js
elemento.classList.add("activo");        // agrega la clase
elemento.classList.remove("activo");     // quita la clase
elemento.classList.toggle("activo");     // agrega si no está, quita si está
elemento.classList.contains("activo");   // true / false
```

---

### dataset

Los atributos `data-*` en el HTML se leen desde JS con `elemento.dataset`:

```html
<div data-id="42" data-categoria="ropa">...</div>
```

```js
const div = document.querySelector("div");
console.log(div.dataset.id);         // "42"  ← siempre string
console.log(div.dataset.categoria);  // "ropa"

// Siempre convertí a número cuando lo necesitás
const precio = Number(div.dataset.precio);
```

---

### Crear y eliminar elementos

```js
// Crear e insertar
const li = document.createElement("li");
li.textContent = "Nuevo ítem";
lista.appendChild(li);  // al final

// Insertar HTML directamente (más cómodo para estructuras complejas)
lista.insertAdjacentHTML("beforeend", `<li>${texto}</li>`);

// Eliminar
elemento.remove();
elemento.firstElementChild.remove();
```

---

### addEventListener

```js
const btn = document.querySelector("#btn");

btn.addEventListener("click", (e) => {
  console.log("Clickeado", e.target);
});

// Eventos más comunes
// "click"   → botones, links, cualquier elemento
// "input"   → cada vez que cambia el valor de un <input>
// "blur"    → cuando un campo pierde el foco
// "submit"  → cuando se envía un formulario
```

---

### submit y preventDefault

```js
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // evita que la página recargue
  // ahora podés leer los datos y validarlos
});
```

---

### Event Delegation

En vez de poner un listener en cada botón, lo ponés en el padre. Fundamental cuando los elementos se crean dinámicamente.

```js
lista.addEventListener("click", (e) => {
  // closest() busca el ancestro más cercano que coincida con el selector
  const btnEliminar = e.target.closest(".btn-eliminar");
  if (!btnEliminar) return; // el click no fue en ese botón

  const id = btnEliminar.dataset.id;
  // eliminá el elemento del array y re-renderizá
});
```

> **¿Por qué no poner un listener en cada botón?** Porque si los elementos se crean después (con `appendChild` o `insertAdjacentHTML`), los listeners que pusiste antes no aplican a los nuevos. El listener en el padre siempre está, no importa cuándo se creen los hijos.

---

## Ejercicios

### Bloque 1 — DOM Puro

#### Ejercicio 1: textContent, innerHTML y classList

Dado el HTML con un título, una descripción y tres tarjetas de personas, sin agregar ningún evento:

1. Cambiá el texto del `<h1>` a `"Equipo de trabajo"` usando `textContent`.
2. Cambiá el `<p>` de descripción usando `innerHTML` para incluir una etiqueta `<strong>`.
3. Agregá la clase `"destacado"` a la primera tarjeta.
4. Agregá la clase `"inactivo"` a la tercera tarjeta.
5. Con `querySelectorAll`, seleccioná todos los elementos con clase `"nombre"` y convertí cada texto a mayúsculas.
6. Usá `classList.toggle` sobre la segunda tarjeta dos veces seguidas y explicá con un comentario qué observás.

> **TIP:** `textContent` es más seguro que `innerHTML` para texto plano porque no interpreta etiquetas. Usá `innerHTML` solo cuando necesitás insertar HTML real.

---

#### Ejercicio 2: createElement, appendChild y remove

Dado un array de tareas y una `<ul>` vacía en el HTML:

1. Renderizá cada tarea como un `<li>` dentro de la lista usando `createElement` + `appendChild`.
2. Eliminá el primer `<li>` de la lista con `remove()`.
3. Creá un nuevo `<li>` con el texto `"Repasar HTML semántico"` e insertalo al principio de la lista.

Resultado esperado:
```
- Repasar HTML semántico   ← nuevo, al principio
- Practicar eventos
- Hacer el proyecto
- Repasar array methods
```

> **TIP:** El flujo para crear e insertar siempre es el mismo: `createElement` → asignar contenido → `appendChild`. Cuando necesitás insertar en una posición específica, investigá `insertAdjacentHTML` o `insertBefore`.

---

#### Ejercicio 3: dataset

Dado el HTML con 4 tarjetas de productos con atributos `data-id`, `data-categoria` y `data-precio`:

1. Con `querySelectorAll`, recorrelos y mostrá en consola los datos de cada uno.
2. Convertí la NodeList a array con `Array.from()`, usá `filter` para obtener los de categoría `"electronica"` y mostrá en `<div#resultado>`: `"Hay 2 productos de electrónica"`.
3. Encontrá el producto más caro y agregale la clase `"destacado"`.

> **TIP:** Los valores de `dataset` son siempre **strings**. Antes de comparar precios necesitás convertirlos a número con `Number()` o `parseFloat()`.

---

### Bloque 2 — Events

#### Ejercicio 4: Contador con límite

Dado el HTML con dos botones (`+` y `−`) y un `<span>` que muestra el valor:

1. Al clickear `+` el valor sube de 1 en 1. Máximo: 10.
2. Al clickear `−` el valor baja de 1 en 1. Mínimo: 0.
3. Cuando se alcanza el límite, el botón correspondiente se deshabilita (`button.disabled = true`).
4. Mostrá `"Mínimo alcanzado"` o `"Máximo alcanzado"` en el párrafo de mensaje según corresponda.
5. **BONUS:** definí el límite máximo como una constante al inicio del archivo para que sea fácil de cambiar.

> **TIP:** Guardá el valor actual en una variable JS, no lo leas del DOM en cada click. Modificá la variable y después actualizá el `textContent` del `<span>`. El DOM refleja el estado, no lo almacena.

---

#### Ejercicio 5: Tabs

Dado el HTML con tres botones de tab y tres secciones de contenido (solo una visible a la vez):

1. Al hacer click en un tab:
   - Quitá la clase `"activo"` de todos los botones y todos los contenidos.
   - Agregá la clase `"activo"` al botón clickeado y al contenido correspondiente.
2. Cada botón tiene `data-tab` con el `id` del contenido que debe mostrar. Usá ese valor para seleccionarlo.

> **TIP:** El patrón es: primero limpiás todo (quitás `"activo"` a todos), después activás solo lo que corresponde. Resistí la tentación de hacer lógica por casos — el patrón genérico maneja cualquier cantidad de tabs.

---

#### Ejercicio 6: Acordeón

Dado el HTML con 4 preguntas frecuentes (botón + contenido oculto por par):

1. Al hacer click en un botón, toggleá la clase `"abierto"` en el botón y en su contenido hermano (`nextElementSibling`).
2. **Comportamiento exclusivo:** antes de abrir un panel, cerrá todos los demás quitándoles la clase `"abierto"`.

> **TIP:** `classList.toggle` maneja el abrir/cerrar en una línea. Para el comportamiento exclusivo, primero recorrés todos y les quitás `"abierto"`, luego agregás `"abierto"` solo al clickeado. Ojo: no uses `toggle` después de limpiar todo, porque el elemento ya no tiene la clase y siempre quedaría abierto — usá `add` directamente.

---

### Bloque 3 — Formularios

#### Ejercicio 7: Buscador en tiempo real

Dado el HTML con un input de búsqueda, un párrafo contador y una lista vacía, y el array de 19 países en el JS:

1. Al cargar la página, renderizá todos los países como `<li>` y mostrá el contador.
2. Al escribir en el input (evento `"input"`), filtrá los países que incluyen el texto ingresado (sin distinguir mayúsculas) y re-renderizá la lista.
3. Actualizá el contador en cada búsqueda. Si no hay resultados, mostrá: `"No se encontraron países"`.
4. Extraé la lógica de render en una función `renderLista(array)` reutilizable.

> **TIP:** Para comparar sin importar el caso: `pais.toLowerCase().includes(busqueda.toLowerCase())`. Para vaciar la lista antes de re-renderizar: `lista.innerHTML = ""`.

---

#### Ejercicio 8: Formulario con validación

Dado el HTML con un formulario de tres campos (nombre, email, contraseña):

**Validación en `blur` (al salir del campo):**

1. **Nombre:** no vacío y mínimo 3 caracteres.
2. **Email:** no vacío y formato válido (contiene `@` y `.`).
3. **Contraseña:** no vacía y mínimo 8 caracteres.

Para cada campo: si hay error → clase `"error"` en el input + mensaje visible. Si es válido → clase `"valido"` + mensaje oculto.

**Validación en `submit`:**

4. Usá `preventDefault()` para evitar la recarga.
5. Validá los tres campos. Si alguno falla, mostrá sus errores y no continúes.
6. Si todos son válidos: ocultá el formulario y mostrá `<div#exito>` agregándole la clase `"visible"`.

> **TIP:** Antes de agregar `"error"` a un input, quitá `"valido"` — y viceversa. Un input no puede estar en los dos estados a la vez.

---

### Bloque 4 — Integrador

#### Ejercicio 9: Lista dinámica de contactos

Dado el HTML con un formulario de agregar, un buscador y una lista vacía, y el array inicial de 4 contactos en el JS:

1. **Render inicial:** mostrá todos los contactos al cargar. Cada uno tiene nombre, email y un botón `✕` con `data-id`. Mostrá el contador.
2. **Agregar:** al clickear "Agregar", leé nombre y email, validá que no estén vacíos, creá un nuevo objeto con `id: Date.now()`, agregalo al array y volvé a renderizar.
3. **Eliminar:** usando **event delegation** sobre el `<ul>`, detectá el click en `.btn-eliminar`, leé el `data-id`, filtrá el array y volvé a renderizar.
4. **Buscar:** al escribir en el buscador, filtrá el array por nombre y renderizá solo los que coincidan. Si no hay resultados, mostrá `"No se encontraron contactos"`.

> **IMPORTANTE:** El array `contactos` es la **fuente de verdad**. Nunca leas el estado desde el DOM. Siempre modificás el array primero y después llamás a `renderContactos()` para que el DOM refleje el estado actual.

---

## Checklist de Tareas

### DOM puro

- [ ] `textContent` para texto plano, `innerHTML` solo cuando hay etiquetas
- [ ] `querySelectorAll` + `forEach` para operar sobre múltiples elementos
- [ ] `classList.add`, `.remove` y `.toggle` usados correctamente
- [ ] `dataset` leído con `elemento.dataset.nombreAtributo`
- [ ] Valores de `dataset` convertidos a número antes de operar matemáticamente

### Crear y eliminar elementos

- [ ] `createElement` → asignar contenido → `appendChild`
- [ ] `insertAdjacentHTML` para HTML más complejo
- [ ] `remove()` para eliminar un elemento del DOM

### Events

- [ ] `addEventListener` con la firma correcta: `(evento, callback)`
- [ ] Estado guardado en variables JS, no leído del DOM
- [ ] Botones deshabilitados con `button.disabled = true/false`
- [ ] `classList.toggle` para abrir/cerrar sin condiciones manuales

### Formularios

- [ ] `e.preventDefault()` en el submit
- [ ] Validación en `blur` (campo por campo) y en `submit` (todos juntos)
- [ ] Mensajes de error visibles/ocultos con clases CSS
- [ ] Inputs marcados como `error` o `valido` (nunca ambos a la vez)

### Event Delegation e integrador

- [ ] Listener en el padre, no en cada elemento hijo
- [ ] `e.target.closest(".selector")` para detectar el elemento clickeado
- [ ] `data-id` en botones dinámicos para identificar el ítem
- [ ] Array como fuente de verdad — el DOM siempre se deriva del array

---

## Criterios de Evaluación

### Correctitud

- El resultado visual coincide con el esperado en cada ejercicio
- Los eventos responden correctamente en todos los casos posibles
- Los casos borde están contemplados: lista vacía, búsqueda sin resultados, formulario inválido

### Uso correcto del DOM

- `textContent` e `innerHTML` usados según corresponde
- No se leen valores del DOM para mantener estado (`input.value` solo al momento del submit o click, no como fuente de verdad persistente)
- El array es siempre la fuente de verdad en los ejercicios con estado

### Calidad del código

- Funciones reutilizables extraídas (ej: `renderLista`, `renderContactos`)
- Sin repetición de lógica de render
- Nombres de variables y funciones descriptivos
- Sin `alert()` — todo el feedback va en el DOM

### Ejercicios individuales

**Bloque 1 — DOM puro**
- [ ] Ejercicio 1: textContent, innerHTML, classList
- [ ] Ejercicio 2: createElement, appendChild, remove
- [ ] Ejercicio 3: dataset con Array.from + métodos de array

**Bloque 2 — Events**
- [ ] Ejercicio 4: Contador con límite y disabled
- [ ] Ejercicio 5: Tabs con classList
- [ ] Ejercicio 6: Acordeón con comportamiento exclusivo

**Bloque 3 — Formularios**
- [ ] Ejercicio 7: Buscador en tiempo real con función renderLista
- [ ] Ejercicio 8: Formulario con validación en blur y submit

**Bloque 4 — Integrador**
- [ ] Ejercicio 9: Lista dinámica con agregar, eliminar, buscar y event delegation

---
