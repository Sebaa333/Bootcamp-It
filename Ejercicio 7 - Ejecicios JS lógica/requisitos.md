# Ejercicio 7 - Lógica Básica con JavaScript

## 📖 Descripción

En este ejercicio darás tus primeros pasos en **JavaScript**. El objetivo es dominar los bloques de construcción más fundamentales del lenguaje: variables, tipos de datos primitivos, operadores matemáticos y condicionales.

No hay interfaz gráfica, no hay frameworks. Solo **lógica pura ejecutada en consola**, que es exactamente donde hay que empezar para entender de verdad cómo funciona un lenguaje de programación.

Cada ejercicio vive en su propio archivo `.js` y se ejecuta con **Node.js** desde la terminal.

---

## 🎯 Objetivos de Aprendizaje

Al completar este ejercicio, demostrarás dominio en:

- **Variables**: declarar con `let` o `const`, asignar valores y reutilizarlas
- **Tipos primitivos**: `String`, `Number`, `Boolean`
- **Operadores matemáticos**: `+`, `-`, `*`, `/`, `%`
- **Template literals**: construir mensajes dinámicos con `` `${}` ``
- **`console.log()`**: mostrar resultados en la terminal

---

## 🏗️ Estructura del Proyecto

Tu proyecto debe tener exactamente esta estructura de archivos:

```
ejercicios-js-basicos/
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
    └── ejercicio10.js
```

El `index.html` ya está creado. Cada archivo `.js` dentro de `js/` corresponde a un ejercicio.

---

## ⚙️ Instrucciones Generales

1. **No borrar el enunciado**: copiar el título del ejercicio como comentario al inicio del archivo.
2. Usar **nombres de variables claros** y descriptivos.
3. Mostrar todos los resultados usando `console.log()`.
4. Probar cada ejercicio antes de pasar al siguiente.

**Para ejecutar un ejercicio desde la terminal:**

```bash
node js/ejercicio1.js
```

---

## 💡 Conceptos Clave Antes de Empezar

Antes de escribir código, asegurate de entender estos conceptos. No son opcionales: son la base de TODO lo que viene después.

### Variables: `let` y `const`

Una variable es un **contenedor con nombre** que guarda un valor. En JavaScript moderno usamos `let` y `const` para declararlas:
Recomienda usar `const` para valores que no cambian, y `let` para los que sí cambian. En este ejercicio, usaremos `let` para todos por simplicidad.

```js
let nombre = "John";    // guarda un String
let edad = 29;          // guarda un Number
let esMayor = true;     // guarda un Boolean
```

> **¿Por qué `let` o `const` y no `var`?** Porque `var` tiene comportamientos confusos con el scope.

---

### Tipos Primitivos

| Tipo      | Ejemplo            | Descripción                       |
| --------- | ------------------ | --------------------------------- |
| `String`  | `"Hola mundo"`     | Texto, siempre entre comillas     |
| `Number`  | `42`, `3.14`       | Números enteros o decimales       |
| `Boolean` | `true` / `false`   | Solo dos valores posibles         |

---

### Template Literals (strings dinámicos)

En lugar de concatenar con `+`, usá **template literals** con backticks `` ` ``:

```js
let nombre = "Martín";
let edad = 29;

// ❌ Concatenación (vieja, difícil de leer)
console.log("Hola, mi nombre es " + nombre + " y tengo " + edad + " años.");

// ✅ Template literal (moderna, clara)
console.log(`Hola, mi nombre es ${nombre} y tengo ${edad} años.`);
```

Ambas producen el mismo resultado, pero los template literals son la forma correcta de hacerlo hoy.

---

### Operadores Matemáticos

```js
let a = 10;
let b = 3;

console.log(a + b);  // 13 → suma
console.log(a - b);  // 7  → resta
console.log(a * b);  // 30 → multiplicación
console.log(a / b);  // 3.333... → división
console.log(a % b);  // 1  → módulo (resto de la división)
```

El operador `%` (módulo) es clave para determinar si un número es **par o impar**:

```js
let numero = 8;

if (numero % 2 === 0) {
  console.log("El número es par.");
} else {
  console.log("El número es impar.");
}
```

---



### Ejercicios individuales

- [ ] Ejercicio 1: Saludo personalizado
- [ ] Ejercicio 2: Suma de dos números
- [ ] Ejercicio 3: Operaciones básicas
- [ ] Ejercicio 4: Área de un rectángulo
- [ ] Ejercicio 5: Perímetro de un rectángulo
- [ ] Ejercicio 6: Promedio de tres notas
- [ ] Ejercicio 7: Precio con IVA
- [ ] Ejercicio 8: Precio con descuento
- [ ] Ejercicio 9: Conversor de horas a minutos
- [ ] Ejercicio 10: Cálculo de sueldo


---

## 📊 Criterios de Evaluación

### Variables y tipos de datos

- Uso correcto de `let` o `const` en todas las declaraciones
- Nombres de variables claros, descriptivos y en minúscula camelCase
- Tipos de datos apropiados para cada situación (String, Number, Boolean)

### Operadores y cálculos

- Fórmulas matemáticas correctas y con paréntesis donde corresponde
- Uso correcto del operador módulo `%`
- Resultados guardados en variables con nombres significativos

### Template literals y console.log

- Uso de template literals en lugar de concatenación con `+`
- Mensajes en consola que coinciden exactamente con el resultado esperado
- Un `console.log` por cada dato a mostrar (no todo en uno)


### Código y organización

- Cada ejercicio en su propio archivo
- Código indentado de forma consistente
- Sin errores de sintaxis ni de ejecución
- Enunciados presentes como comentarios

---


