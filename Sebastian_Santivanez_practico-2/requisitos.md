# Requisitos del Proyecto - Destinos para Viajar

## Objetivo

Crear una página web simple sobre "Destinos para Viajar" utilizando HTML y CSS básico. Este ejercicio te ayudará a practicar los conceptos fundamentales de **títulos**, **párrafos**, **enlaces**, **imágenes** y **estilos CSS** básicos vistos en clase.

---

## 1. Paleta de Colores Sugerida

Puedes utilizar estos colores como referencia:

- **Color de fondo del header**: `#2c3e50` (azul oscuro)
- **Color de fondo del body**: `#ecf0f1` (gris claro)
- **Color de los títulos**: `#2980b9` (azul)
- **Color de los enlaces**: `#3498db` (azul claro)
- **Color de los enlaces al pasar el mouse**: `#e74c3c` (rojo)
- **Color del footer**: `#34495e` (gris oscuro)

**Nota**: Estos colores son solo una sugerencia. Puedes explorar y usar los que prefieras para darle tu toque personal.

---

## 2. Tipografía

- Puedes usar la fuente que viene por defecto o experimentar con fuentes de Google Fonts
- **Sugerencia**: Prueba con fuentes como `Arial`, `Helvetica`, o `Verdana` para empezar

---

## 3. Estructura HTML

Tu página debe incluir las siguientes secciones:

### Header

- Un título principal (`<h1>`) con el nombre: "Destinos para Viajar"
- Un párrafo con subtítulo que mencione HTML y CSS (usa `<span>` para resaltar estas palabras)

### Main

Debe contener 5 secciones:

### Footer

- Un párrafo con el texto: "Ejercicio 2 - HTML y CSS básico"

---

## 4. Estilos CSS Básicos

Debes aplicar estilos para los siguientes elementos:

### Body

- Color de fondo
- Márgenes y/o padding
- Tipo de fuente

### Header

- Color de fondo diferente al body
- Color de texto
- Alineación del texto
- Espaciado interno (padding)

### Títulos

- Color personalizado
- Espaciado

### Párrafos

- Espaciado entre líneas
- Márgenes

### Enlaces

- Color de los enlaces
- Quitar el subrayado (opcional)
- Color diferente al pasar el mouse (`:hover`)

### Imágenes

- Ancho máximo para que se vean bien
- Bordes o sombras (opcional)

### Listas

- Estilo de las viñetas o números
- Espaciado

### Footer

- Color de fondo
- Color de texto
- Alineación del texto
- Espaciado interno

### Secciones

- Espaciado entre secciones
- Márgenes y padding

---

## 5. Contenido a Incluir

Consulta el archivo `contenido.txt` para obtener todo el texto que debes usar en cada sección de la página.

---

## 6. Imágenes Necesarias

Las siguientes imágenes ya están disponibles en la carpeta `/assets/images/`:

- `bariloche.jpg` - Paisaje de Bariloche
- `rio.jpg` - Vista de Río de Janeiro
- `cusco.jpg` - Paisaje de Cusco

---

## 7. Resultado Esperado

**Consulta las imágenes de referencia para ver el resultado esperado:**

- 📸 `example1.png` - Vista completa de la página (parte 1)
- 📸 `example2.png` - Vista completa de la página (parte 2)

Estas imágenes te mostrarán cómo puede verse tu proyecto terminado. Úsalas como guía visual, pero recuerda que puedes darle tu toque personal con los colores y estilos que prefieras.

---

## 8. Estructura de Archivos

```
proyecto/
├── index.html
├── styles.css
├── assets/
│   └── images/
│       ├── bariloche.jpg
│       ├── rio.jpg
│       └── cusco.jpg
├── contenido.txt (texto para usar)
├── example1.png (referencia visual)
└── example2.png (referencia visual)
```

---

## 9. Checklist de Tareas

### HTML

- [ ] Estructura básica HTML con DOCTYPE, html, head y body
- [ ] Título de la página (`<title>`) en el head
- [ ] Enlace al archivo CSS en el head
- [ ] Header con `<h1>` y párrafo
- [ ] Etiqueta `<main>` con 5 secciones
- [ ] Sección 1: título h2, 2 párrafos, 1 enlace externo
- [ ] Sección 2: título h2, lista no ordenada con 3 enlaces internos
- [ ] Sección 3 (Bariloche): título h2, imagen, 2 párrafos, enlace externo, lista ordenada
- [ ] Sección 4 (Río): título h2, imagen, 2 párrafos, enlace externo, lista ordenada
- [ ] Sección 5 (Cusco): título h2, imagen, 2 párrafos, enlace externo, lista ordenada
- [ ] Footer con párrafo
- [ ] Todas las secciones de destinos tienen `id` correspondiente (#bariloche, #rio, #cusco)
- [ ] Uso de `<span>` para resaltar palabras en el header

### CSS

- [ ] Estilos para el body (fondo, fuente, márgenes)
- [ ] Estilos para el header (fondo, color, padding, alineación)
- [ ] Estilos para todos los títulos h1 y h2 (color, espaciado)
- [ ] Estilos para los párrafos (espaciado, márgenes)
- [ ] Estilos para los enlaces (color, decoración)
- [ ] Estilos para enlaces con hover (color diferente)
- [ ] Estilos para las imágenes (tamaño, bordes o sombras)
- [ ] Estilos para las listas (estilo de viñetas/números, espaciado)
- [ ] Estilos para el footer (fondo, color, padding, alineación)
- [ ] Estilos para las secciones (márgenes, padding)
- [ ] Estilo especial para el `<span>` en el header (color diferente)

---

## 10. Conceptos a Practicar

- ✅ **Estructura HTML**: Uso correcto de etiquetas semánticas
- ✅ **Títulos**: h1, h2
- ✅ **Párrafos**: p
- ✅ **Enlaces**: a (internos y externos, target="\_blank")
- ✅ **Imágenes**: img con src y alt
- ✅ **Listas**: ul (no ordenada) y ol (ordenada)
- ✅ **IDs**: Para navegación interna
- ✅ **CSS básico**: Colores, fondos, márgenes, padding
- ✅ **Selectores CSS**: Elementos, clases (opcional), IDs (opcional)
- ✅ **Pseudo-clases**: :hover para enlaces

---

## 11. Consejos

- Comienza estructurando todo el HTML antes de aplicar estilos
- Verifica que todos los enlaces funcionen correctamente
- Asegúrate de que las imágenes se carguen bien
- Experimenta con diferentes colores y estilos
- Usa las imágenes de ejemplo como guía, pero no te limites a copiarlas exactamente
- Prueba tu página en el navegador frecuentemente mientras trabajas

---

¡Buena suerte con tu proyecto! Recuerda que lo importante es practicar y aprender.
