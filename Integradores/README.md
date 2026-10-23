# Mundo Pilar — Juguetería (Proyecto Integrador, Etapa 1)

Sitio web estático de una juguetería, hecho con **HTML5, CSS y JavaScript puro**.
Sin Bootstrap, sin frameworks, sin librerías JS y sin proceso de build.

## Cómo abrirlo

1. **Con el servidor (recomendado):** `npm run dev` y abrí <http://localhost:3000> (ver sección *Backend*).
2. **Sin servidor:** abrí `src/public/index.html` con doble clic en cualquier navegador (se muestran las cards estáticas).
3. **Con Live Server (VS Code):** clic derecho sobre `src/public/index.html` → *Open with Live Server*.

Ambas opciones funcionan igual porque **todas las rutas internas son relativas** (no hay ninguna que empiece con `/`).

## Estructura

```
Integradores/
├── src/
│   ├── public/           Front completo (lo que sirve el servidor)
│   │   ├── index.html            Catálogo con 12 cards de producto, filtro y orden
│   │   ├── alta.html             Formulario de alta de producto (11 campos)
│   │   ├── contacto.html         Formulario de contacto (5 campos)
│   │   ├── nosotros.html         Historia, valores, línea de tiempo, equipo y FAQ
│   │   ├── css/styles.css        Hoja única con design tokens y 15 secciones comentadas
│   │   ├── js/main.js            Navegación, búsqueda, carrito, filtro, orden y catálogo desde la API
│   │   ├── js/validaciones.js    Validación con expresiones regulares y envío al backend
│   │   ├── assets/img/           16 imágenes SVG creadas para el proyecto
│   │   └── uploads/              Fotos subidas (ignoradas por git)
│   └── ...               Backend (ver sección Backend)
├── tests/                Tests de la API
└── README.md
```

## Decisiones de diseño

- **Sistema de diseño propio** (el proyecto no tenía tokens previos). Todo vive en `:root`
  dentro de `css/styles.css`: colores, escala tipográfica, escala de espaciado (base 4px),
  radios y sombras. No hay hex ni tamaños sueltos fuera de ese bloque.
- **Paleta:** azul `#1D4ED8` (primario), rojo `#C11836` (acción), amarillo `#FFC93C`
  (decorativo, siempre con texto oscuro), verde `#0E7A4F` (envío sin cargo) y tinta
  `#15192C` sobre blanco. Todos los pares de texto/fondo superan el contraste **WCAG AA 4.5:1**.
- **Tipografías (Google Fonts):** `Baloo 2` para títulos (redondeada, "juguetona") y
  `Nunito Sans` para el cuerpo (alta legibilidad). Máximo dos familias.
- **Iconos:** una sola librería, **Font Awesome 6** por CDN (CSS, no JS).
- **Breakpoints (mobile first, `min-width`):** 480px, 768px, 1024px y 1280px.
- **Estrategia responsive de las cards:**
  | Resolución | Composición |
  |---|---|
  | < 480px | Vertical, imagen arriba, 1 columna |
  | 480–767px | **Horizontal**, imagen al costado, 1 columna |
  | ≥ 768px | Vertical dentro de una grilla de 2 columnas |
  | ≥ 1024px | Grilla de 3 columnas |
  | ≥ 1280px | Grilla de 4 columnas |

  Los datos obligatorios (imagen, título, precio, descripción corta y botón *Comprar*)
  están visibles en **todas** las resoluciones. Solo la lista opcional de marca y edad
  (`.product-card__meta`) se oculta por debajo de 480px.
- **Accesibilidad:** skip link, `aria-current="page"` en la página activa, `aria-expanded`
  en el menú hamburguesa y en el detalle de cada card, `role="alert"` en los errores,
  foco visible con `:focus-visible` y guarda `prefers-reduced-motion`.

## Validaciones (`src/public/js/validaciones.js`)

La validación es **data-driven**: cada formulario declara sus reglas en `FORM_RULES` y un
único bucle genérico las aplica. Agregar un campo es agregar una entrada, no un `if` nuevo.

Si algo falla: `event.preventDefault()`, mensaje específico debajo del campo, resumen de
errores arriba del formulario y foco en el primer campo con problema. Tras el primer envío,
los campos se revalidan en `input`, `blur` y `change`, y el error se borra al corregirse.

### alta.html (`#product-form`)

| Campo | Regla | Mensaje |
|---|---|---|
| Nombre | Obligatorio, 3–60, letras/números/espacios/`.,'-+&/` | "Ingresá entre 3 y 60 caracteres…" |
| Precio | Obligatorio, hasta 7 enteros y 2 decimales, > 0 | "Ingresá un precio válido…" / "El precio debe ser mayor a cero." |
| Stock | Obligatorio, entero 0–99999 | "El stock debe ser un número entero…" |
| Marca | Obligatorio, opción real de la lista | "Seleccioná una marca de la lista." |
| Categoría | Obligatorio, opción real de la lista | "Seleccioná una categoría de la lista." |
| Descripción corta | Obligatorio, 10–120 caracteres | "…entre 10 y 120 caracteres." |
| Descripción larga | Obligatorio, 20–600 caracteres | "…entre 20 y 600 caracteres." |
| Edad desde | Obligatorio, entero 0–99 | "Ingresá un número entero entre 0 y 99…" |
| Edad hasta | Obligatorio, entero 0–99 y ≥ edad desde | "La \"edad hasta\" (X) no puede ser menor que la \"edad desde\" (Y)." |
| Foto | Obligatorio, extensión jpg/jpeg/png/gif/webp/svg | "El archivo debe ser una imagen con extensión…" |
| Envío sin cargo | **Optativo**, checkbox | — |

### contacto.html (`#contact-form`)

| Campo | Regla | Mensaje |
|---|---|---|
| Nombre y apellido | Obligatorio, 3–50, solo letras/espacios/`'`/`-` | "Ingresá entre 3 y 50 caracteres…" |
| E-mail | Obligatorio, `nombre@dominio.tld` | "Ingresá un e-mail válido…" |
| Teléfono | **Optativo**, 7–20 caracteres, dígitos y `+ - ( )` | "El teléfono debe tener entre 7 y 20 caracteres…" |
| Asunto | Obligatorio, opción real de la lista | "Seleccioná un asunto de la lista." |
| Comentarios | Obligatorio, 10–500 caracteres | "Los comentarios deben tener entre 10 y 500 caracteres." |

Los formularios llevan `novalidate` (aplicado desde JS) para que la validación evaluada
sea siempre la de las expresiones regulares y no la nativa del navegador.

## Backend

Servidor **Express + Mongoose** que guarda productos y consultas de contacto en MongoDB y
sirve también el front (mismo origen, sin CORS en el uso normal).

### Requisitos

- Node.js 20 o superior.
- MongoDB local en `mongodb://127.0.0.1:27017`.
- Un archivo `.env` en la raíz (copiá `.env.example`):

  ```
  PORT=3000
  MONGODB_URI=mongodb://127.0.0.1:27017/mundo_pilar
  ```

  Si falta, el servidor usa esos mismos valores por defecto.

### Puesta en marcha

```bash
npm install        # instala dependencias
npm run seed       # carga los 12 productos del catálogo (borra los existentes)
npm run dev        # servidor con recarga automática (o npm start)
npm test           # tests con node:test + supertest (base mundo_pilar_test)
```

Luego abrí <http://localhost:3000>. Si abrís el HTML con doble clic o Live Server, el front
apunta a `http://localhost:3000` y, si el servidor no está activo, muestra las cards estáticas.

### Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/products` | Lista de productos |
| GET | `/api/products/:id` | Un producto (400 si el id es inválido, 404 si no existe) |
| POST | `/api/products` | Crea un producto (`multipart/form-data`, foto obligatoria: imagen de hasta 2 MB) |
| PUT | `/api/products/:id` | Actualiza campos y, opcionalmente, la foto |
| DELETE | `/api/products/:id` | Elimina el producto y su foto subida |
| POST | `/api/contacts` | Registra una consulta (JSON: `name`, `email`, `phone`, `subject`, `comments`) |
| GET | `/api/contacts` | Lista las consultas recibidas (solo para pruebas) |

Los errores responden `{ "error": "mensaje" }` con estado 400 (validación o id inválido),
404 o 500. Las fotos subidas se guardan en `src/public/uploads/` (su contenido se ignora en git).

### Estructura del servidor

El código es CommonJS (archivos `.cjs`) y vive en `src/`. El front está en `src/public/`
y es la única carpeta que el servidor publica: el código del backend y `.env` no son accesibles.

```
src/
├── server.cjs          Carga .env, conecta a MongoDB y levanta el servidor
├── app.cjs             Arma la app Express (sin listen, para los tests)
├── conexion/           conexion.cjs: conexión a MongoDB
├── models/             productModel.cjs, contactModel.cjs
├── controllers/        productController.cjs, contactController.cjs
├── routes/             productRoute.cjs, contactRoute.cjs
├── middlewares/        errors.cjs (404 y errores) y upload.cjs (multer)
├── data/               products.json (12 productos) y seed.cjs
└── public/             Front estático (HTML, css/, js/, assets/, uploads/)
tests/                  products.test.cjs, contacts.test.cjs
```


