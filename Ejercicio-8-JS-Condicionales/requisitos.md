# Ejercicio 8 - Condicionales y Operadores Lógicos en JavaScript

## 📖 Descripción

En este ejercicio profundizás en la **toma de decisiones** dentro de un programa. Si en el ejercicio anterior aprendiste a declarar variables y hacer cálculos, ahora tu código va a poder **evaluar condiciones y elegir qué hacer** según esas condiciones.

Esta es la diferencia entre un script que siempre hace lo mismo y uno que **reacciona** a los datos.

Todos los ejercicios se ejecutan en consola con Node.js. No hay interfaz gráfica: el foco está en que la **lógica sea correcta**.

---

## 🎯 Objetivos de Aprendizaje

Al completar este ejercicio, demostrarás dominio en:

- **Condicionales**: `if`, `else if`, `else` con múltiples ramas
- **`switch / case`**: selección entre múltiples valores posibles
- **Operadores de comparación**: `===`, `!==`, `>`, `<`, `>=`, `<=`
- **Operadores lógicos**: `&&` (AND), `||` (OR), `!` (NOT)
- **Operador ternario**: `condicion ? valorTrue : valorFalse`
- **Combinación de operadores**: lógica compleja con paréntesis

---

## 🏗️ Estructura del Proyecto

Tu proyecto debe tener exactamente esta estructura:

```
ejercicios-js-condicionales/
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
```

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

### Condicionales: `if / else if / else`

Permiten que el programa tome caminos diferentes según el valor de una condición.

```js
let nota = 7;

if (nota >= 9) {
  console.log("Sobresaliente");
} else if (nota >= 6) {
  console.log("Aprobado");
} else {
  console.log("Desaprobado");
}
```

> **Regla:** el `else if` y el `else` son opcionales. Se usan solo cuando hay más de un camino posible.

---

### `switch / case`

Útil cuando necesitás comparar una variable con **múltiples valores exactos**. Es más legible que una cadena larga de `if / else if` cuando todos los casos son igualdades.

```js
let dia = "lunes";

switch (dia) {
  case "lunes":
    console.log("Inicio de semana");
    break;
  case "viernes":
    console.log("Fin de semana laboral");
    break;
  default:
    console.log("Día intermedio");
}
```

> **Importante:** no olvidar el `break` en cada `case`. Sin él, el código "cae" al siguiente caso y ejecuta código que no debería.

---

### Operadores de Comparación

| Operador | Significado              | Ejemplo              |
|----------|--------------------------|----------------------|
| `===`    | Igual (valor y tipo)     | `"5" === 5` → false  |
| `!==`    | Distinto (valor y tipo)  | `"5" !== 5` → true   |
| `>`      | Mayor que                | `10 > 5` → true      |
| `<`      | Menor que                | `3 < 7` → true       |
| `>=`     | Mayor o igual            | `5 >= 5` → true      |
| `<=`     | Menor o igual            | `4 <= 3` → false     |

> **Siempre usar `===` y `!==`**. El `==` hace conversiones de tipo implícitas que generan bugs difíciles de rastrear.

---

### Operadores Lógicos: `&&`, `||`, `!`

Permiten combinar múltiples condiciones en una sola expresión.

```js
let edad = 20;
let tieneEntrada = true;

// AND: ambas deben ser verdaderas
if (edad >= 18 && tieneEntrada) {
  console.log("Puede ingresar.");
}

// OR: basta con que una sea verdadera
let esAdmin = false;
let esEditor = true;

if (esAdmin || esEditor) {
  console.log("Tiene acceso.");
}

// NOT: invierte el valor booleano
let tieneDeudas = false;

if (!tieneDeudas) {
  console.log("Sin deudas.");  // !false === true
}
```

---

### Los Paréntesis Importan

Cuando combinás `&&` y `||` en la misma expresión, los paréntesis definen el orden de evaluación. Sin ellos, `&&` tiene mayor precedencia que `||` y puede cambiar completamente el resultado.

```js
// ¿Qué evalúa primero?
true || false && false   // → true (el && se evalúa primero)

// Con paréntesis explícitos:
(true || false) && false // → false
true || (false && false) // → true
```

> **Regla práctica:** cuando uses `&&` y `||` juntos, siempre poné paréntesis aunque no sean técnicamente necesarios. Hace el código más legible y evita bugs.

---

### Operador Ternario

Es un `if / else` comprimido en una expresión. Útil para **asignar un valor** según una condición.

```js
// Forma larga
let mensaje;
if (edad >= 18) {
  mensaje = "Mayor de edad";
} else {
  mensaje = "Menor de edad";
}

// Forma corta con ternario
let mensaje = edad >= 18 ? "Mayor de edad" : "Menor de edad";
```

> **Cuándo usarlo:** solo para decisiones simples de dos valores. Si la lógica es compleja, preferí `if / else` por claridad.

---

## ✅ Checklist de Tareas

### Configuración inicial

- [ ] Crear la carpeta del proyecto con la subcarpeta `js/`
- [ ] Verificar que `index.html` enlaza correctamente al script activo

### Conceptos — Condicionales

- [ ] Usar `if / else if / else` cuando hay múltiples ramas de ejecución
- [ ] No tener condiciones superpuestas (los rangos no se pisan entre sí)
- [ ] El `else` cubre el caso por defecto (no necesita condición)

### Conceptos — `switch / case`

- [ ] Cada `case` tiene su `break` correspondiente
- [ ] El `default` está presente para cubrir valores inesperados
- [ ] No usar `switch` para rangos numéricos (para eso es el `if / else if`)

### Conceptos — Operadores de comparación

- [ ] Usar siempre `===` y `!==` (nunca `==` ni `!=`)
- [ ] Los rangos están escritos correctamente con `>=` y `<=`
- [ ] Las condiciones de igualdad para strings usan `===`

### Conceptos — Operadores lógicos

- [ ] `&&` se usa cuando TODAS las condiciones deben cumplirse
- [ ] `||` se usa cuando BASTA con que UNA condición se cumpla
- [ ] `!` se usa para invertir un booleano (no comparar con `=== false`)
- [ ] Los paréntesis agrupan correctamente cuando se mezclan `&&` y `||`

### Conceptos — Operador ternario

- [ ] Se usa solo para decisiones simples de dos valores
- [ ] El resultado se guarda en una variable antes de mostrarse
- [ ] No se anidan ternarios (si hace falta, usar `if / else`)

### Código y organización

- [ ] Cada ejercicio en su propio archivo
- [ ] Enunciado incluido como comentario al inicio del archivo
- [ ] Código indentado de forma consistente (2 o 4 espacios, siempre igual)
- [ ] Sin errores de sintaxis ni de ejecución
- [ ] Se usan template literals en lugar de concatenación con `+`

---

## 📊 Criterios de Evaluación

### Correctitud lógica

- Las condiciones evalúan exactamente lo que el enunciado pide
- Los casos borde están cubiertos (valor en el límite del rango, valor por defecto)
- Las condiciones compuestas usan el operador correcto (`&&` vs `||`)

### Uso correcto de herramientas

- `switch` para múltiples valores exactos; `if / else if` para rangos
- `===` para todas las comparaciones
- `!` para negar booleanos (no `=== false`)
- Paréntesis cuando se mezclan `&&` y `||`

### Calidad del código

- Variables con nombres descriptivos
- Código legible e indentado
- Template literals para mensajes dinámicos
- Un `console.log` por cada dato a mostrar

### Ejercicios individuales

- [ ] Ejercicio 1: Categoría de edad
- [ ] Ejercicio 2: Semáforo
- [ ] Ejercicio 3: Día de la semana
- [ ] Ejercicio 4: Estación del año
- [ ] Ejercicio 5: Número entre rango
- [ ] Ejercicio 6: Acceso con rol
- [ ] Ejercicio 7: Múltiplo de 3 o 5
- [ ] Ejercicio 8: Aprobación de préstamo
- [ ] Ejercicio 9: Año bisiesto
- [ ] Ejercicio 10: Operador ternario
- [ ] Ejercicio 11: Clasificación de velocidad
- [ ] Ejercicio 12: Calculadora de envío
- [ ] Ejercicio 13: Validación de contraseña
- [ ] Ejercicio 14: Acceso a contenido para mayores

---
