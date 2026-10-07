# Ejercicio 9 - Objetos, Arrays y Funciones en JavaScript

## 📖 Descripción

En este ejercicio entrenás los tres pilares que sostienen casi todo el código JavaScript real antes de tocar el DOM: **objetos**, **arrays** y **funciones**.

Si en el ejercicio anterior aprendiste a tomar decisiones con condicionales, ahora tu código va a poder **estructurar datos y reutilizar lógica**. Sin estos conceptos no hay frontend posible: formularios, APIs, listas dinámicas, toda la lógica de una app pasan por acá.

Todos los ejercicios se ejecutan en consola con Node.js. El foco está en que la **lógica sea correcta**.

---

## 🎯 Objetivos de Aprendizaje

Al completar este ejercicio, demostrarás dominio en:

- **Arrays**: crear, acceder, modificar y recorrer colecciones ordenadas
- **Métodos de array básicos**: `.push()`, `.pop()`, `.shift()`, `.unshift()`, `.slice()`, `.splice()`, `.includes()`, `.indexOf()`
- **Métodos de alto orden**: `.forEach()`, `.map()`, `.filter()`, `.find()`, `findIndex()`.some()`, `.every()`, `.reduce()`
- **Objetos**: propiedades, notación de punto y corchetes, `for...in`, métodos con `this`
- **Funciones**: declaración, `return`, parámetros por defecto, funciones que trabajan con arrays y objetos

---

## 🏗️ Estructura del Proyecto

Tu proyecto debe tener exactamente esta estructura:

```
ejercicios-js-objetos-arrays-funciones/
├── index.html
└── js/
    ├── ejercicio1.js
    ├── ejercicio2.js
    ├── ejercicio3.js
    ├── ejercicio4.js
    ├── ejercicio5.js
    ├── ejercicio6.js
    ├── ejercicio7.js
    ├── ejercicio8.js
    ├── ejercicio9.js
    ├── ejercicio10.js
    ├── ejercicio11.js
    ├── ejercicio12.js
    ├── ejercicio13.js
    ├── ejercicio14.js
    └── ejercicio15.js
```

---

## ⚙️ Instrucciones Generales

1. **No borrar el enunciado**: ya está incluido como comentario en cada archivo. No lo eliminés.
2. Escribir todo el código **debajo** de los comentarios.
3. Usar **nombres de variables claros** y descriptivos.
4. Mostrar todos los resultados con `console.log()`.
5. Probar cada ejercicio antes de pasar al siguiente.

**Para ejecutar un ejercicio desde la terminal:**

```bash
node js/ejercicio1.js
```

---

## 💡 Conceptos Clave

### Arrays

Un array es una colección **ordenada** de valores. Cada elemento tiene un índice numérico que empieza en `0`.

```js
let frutas = ["manzana", "naranja", "pera"];

console.log(frutas[0]);                  // "manzana"
console.log(frutas[frutas.length - 1]); // "pera" — último elemento sin hardcodear el índice
```

**Métodos esenciales:**

| Método | Qué hace | ¿Muta el array? |
|--------|----------|:---:|
| `.push(x)` | Agrega `x` al final | ✅ |
| `.pop()` | Elimina y retorna el último | ✅ |
| `.unshift(x)` | Agrega `x` al principio | ✅ |
| `.shift()` | Elimina y retorna el primero | ✅ |
| `.slice(i, j)` | Retorna una copia del segmento `[i, j)` sin tocar el original | ❌ |
| `.splice(i, n)` | Elimina `n` elementos desde el índice `i`, retorna lo eliminado | ✅ |
| `.includes(x)` | `true` si `x` está en el array | ❌ |
| `.indexOf(x)` | Índice de `x`, o `-1` si no existe | ❌ |

> **Importante:** saber si un método muta o no el array original es fundamental. Mutar cuando no debés es una fuente clásica de bugs.

---

### Objetos

Un objeto agrupa datos relacionados como pares **clave: valor**.

```js
let persona = {
  nombre: "Ana",
  edad: 28
};

// Dos formas de acceder al mismo valor:
console.log(persona.nombre);      // notación de punto — lo más común
console.log(persona["nombre"]);   // notación de corchetes

// Cuándo usar corchetes:
let clave = "nombre";
console.log(persona[clave]);      // cuando el nombre está en una variable
// persona.clave NO funcionaría — buscaría una propiedad llamada "clave"
```

**`for...in` para recorrer todas las propiedades:**

```js
for (let clave in persona) {
  console.log(clave, persona[clave]);
}
```

**`this` dentro de métodos:**

```js
let rectangulo = {
  base: 5,
  altura: 3,
  area: function() {
    return this.base * this.altura; // this = el propio objeto
  }
};
```

> `this` es la forma que tiene un método de referirse a las propiedades del objeto al que pertenece. Sin `this`, estarías buscando variables globales que no existen.

---

### Funciones

Una función es un bloque de código **reutilizable** con parámetros opcionales y un valor de retorno.

```js
// Declaración clásica
function sumar(a, b) {
  return a + b;
}

// Arrow function — retorno implícito (una sola expresión, sin llaves)
const sumar = (a, b) => a + b;

// Arrow function — retorno explícito (bloque con llaves)
const sumar = (a, b) => {
  return a + b;
};

// Parámetro por defecto
function saludar(nombre, idioma = "es") { ... }
```

> **Regla fundamental:** si una función calcula algo, necesita `return`. Sin `return`, la función devuelve `undefined` y el resultado se pierde.

---

### Métodos de alto orden

Reciben una **función como argumento** y operan sobre cada elemento del array. Son la forma idiomática de trabajar con colecciones en JavaScript moderno.

```js
let numeros = [1, 2, 3, 4, 5];

// forEach — ejecuta algo por cada elemento, no retorna nada útil
numeros.forEach(n => console.log(n));

// map — transforma cada elemento, retorna un array nuevo del MISMO largo
let dobles = numeros.map(n => n * 2);          // [2, 4, 6, 8, 10]

// filter — filtra por condición, retorna un array nuevo (puede ser más corto)
let pares = numeros.filter(n => n % 2 === 0);  // [2, 4]

// find — retorna el PRIMER elemento que cumple la condición, o undefined
let primero = numeros.find(n => n > 3);        // 4

// findIndex — retorna el índice del PRIMER elemento que cumple la condición, o -1
let indice = numeros.findIndex(n => n > 3);    // 3

// some — true si AL MENOS UNO cumple la condición
numeros.some(n => n > 4);   // true

// every — true solo si TODOS cumplen la condición
numeros.every(n => n > 0);  // true

// reduce — acumula un único resultado a partir de todos los elementos
let suma = numeros.reduce((acum, n) => acum + n, 0); // 15
//                         ↑ acumulador  ↑ elemento   ↑ valor inicial
```

> **El error más común:** usar `forEach` donde debería ir `map` o `filter`. La regla es simple:
> - ¿Querés un array nuevo transformado? → `map`
> - ¿Querés un subconjunto del array? → `filter`
> - ¿Solo querés ejecutar algo por cada elemento sin guardar nada? → `forEach`

---

## ✅ Checklist de Tareas

### Configuración

- [ ] Crear la carpeta del proyecto con la subcarpeta `js/`
- [ ] Crear los 30 archivos `.js`
- [ ] Verificar que `index.html` enlaza al script activo

### Arrays

- [ ] Acceder por índice, incluyendo el último con `length - 1`
- [ ] Usar `.push()`, `.pop()`, `.unshift()`, `.shift()` correctamente
- [ ] Entender cuáles métodos mutan el array y cuáles no
- [ ] Recorrer con `for` clásico usando el índice
- [ ] Usar `.includes()` e `.indexOf()` para buscar elementos

### Objetos

- [ ] Crear objetos con propiedades de distintos tipos
- [ ] Saber cuándo usar punto y cuándo usar corchetes
- [ ] Modificar, agregar y eliminar propiedades (`delete`)
- [ ] Recorrer propiedades con `for...in`
- [ ] Usar `this` correctamente dentro de métodos

### Funciones

- [ ] Toda función que calcula algo tiene `return`
- [ ] Los parámetros tienen nombres descriptivos
- [ ] Usar parámetros por defecto cuando un argumento es opcional
- [ ] Cada función hace una sola cosa
- [ ] Funciones que reciben y retornan tanto objetos como arrays

### Código

- [ ] Cada ejercicio en su propio archivo
- [ ] Sin errores de sintaxis ni de ejecución
- [ ] Template literals para mensajes dinámicos
- [ ] No mutar arrays u objetos cuando el enunciado pide un resultado nuevo

---

## 📊 Criterios de Evaluación

### Correctitud

- Los resultados coinciden con los esperados en el enunciado
- Se usa el método correcto para cada tarea
- No se mutan datos cuando no corresponde

### Herramientas

- `===` para todas las comparaciones
- `.includes()` / `.indexOf()` para buscar en arrays (no recorrer manualmente)
- `.slice()` y `.splice()` con sus diferencias claras (uno muta, el otro no)

### Calidad

- Variables y funciones con nombres descriptivos
- Funciones cortas que hacen una sola cosa
- Template literals para mensajes dinámicos
- Sin lógica repetida (si algo se repite, es una función)

---

## 📋 Lista de Ejercicios

**Bloque 1 — Arrays**
- [ ] Ejercicio 1: Primer contacto con arrays
- [ ] Ejercicio 2: Modificar un array
- [ ] Ejercicio 3: Buscar en un array
- [ ] Ejercicio 4: Recorrer con `for`
- [ ] Ejercicio 5: Sumar y promediar
- [ ] Ejercicio 6: `slice` y `splice`

**Bloque 2 — Objetos**
- [ ] Ejercicio 7: Primer contacto con objetos
- [ ] Ejercicio 8: Modificar un objeto
- [ ] Ejercicio 9: Notación de corchetes
- [ ] Ejercicio 10: Recorrer con `for...in`
- [ ] Ejercicio 11: Objeto con método

**Bloque 3 — Funciones**
- [ ] Ejercicio 12: Funciones que reciben y retornan objetos
- [ ] Ejercicio 13: Funciones básicas con `return`
- [ ] Ejercicio 14: Parámetros por defecto
- [ ] Ejercicio 15: Funciones que reciben y retornan arrays

---
