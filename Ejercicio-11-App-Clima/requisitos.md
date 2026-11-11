# Ejercicio 11 — App Clima

Construí una aplicación que muestre el clima actual usando la API de **OpenWeatherMap**.

---

## Recursos antes de empezar

- API: [https\://openweathermap.org/api](https://openweathermap.org/api) — creá una cuenta gratuita y obtené tu API key.  
- Endpoint base: `https://api.openweathermap.org/data/2.5/weather`  
- Parámetros clave: `q` (ciudad), `lat` / `lon` (coordenadas), `appid` (tu key), `units=metric`, `lang=es`  
- Imágenes de fondo: ya están en `assets/images/` — `clear.jpg`, `clouds.jpg`, `rain.jpg`, `thunderstorm.jpg`, `snow.jpg`, `fog.jpg`, `default.jpg`

---

## Tareas

### Tarea 1 — Configuración inicial

Definí todo lo que tu app va a necesitar desde el arranque: la URL base de la API, tu key, unas coordenadas por defecto para cuando no se pueda obtener la ubicación del usuario (podés usar Buenos Aires), y las referencias a los elementos del DOM que vas a manipular.

> 💡 Revisá el `index.html` para ver qué IDs tienen los elementos antes de arrancar.

---

### Tarea 2 — Consulta a la API por coordenadas

Escribí una función que reciba dos datos de ubicación geográfica y haga la consulta a la API. Cuando la respuesta llegue, delega el trabajo de mostrar los datos en otra función. Si algo falla, avisale al usuario.

> 💡 Esta función te va a servir tanto para la ubicación real del usuario como para el fallback con las coords por defecto.

---

### Tarea 3 — Consulta a la API por nombre de ciudad

Escribí una función que reciba el nombre de una ciudad y haga la consulta. Si tiene éxito, además de mostrar los datos, guardá la ciudad en `localStorage` y habilitá el botón de guardar. Si falla (ciudad no encontrada), informale al usuario con claridad.

> 💡 La API devuelve el nombre normalizado de la ciudad en `data.name` — conviene usar ese valor para guardar en localStorage, no el que escribió el usuario.

---

### Tarea 4 — Mostrar los datos en pantalla

Escribí una función que reciba el objeto completo que devuelve la API y actualice todos los elementos del HTML. Tiene que encargarse de: temperaturas, descripción, ícono, detalles (sensación, humedad, viento), fecha/hora, y el fondo de la card.

> 💡 El ícono del clima se arma con el código que viene en `data.weather[0].icon`. La URL del ícono es pública y la podés encontrar en la documentación de OWM.

> 💡 Para la imagen de fondo, el dato relevante es `data.weather[0].main` — no `description`. Son cosas distintas.

---

### Tarea 5 — Fecha y hora formateada

Escribí una función que no reciba parámetros y retorne un string con la fecha y hora actual en este formato:

```
Lunes, 19 de Mayo de 2025 — 14:35
```

Usá el objeto `Date` de JavaScript. No uses librerías externas.

> 💡 `getDay()` y `getMonth()` devuelven números, no nombres. Vas a necesitar una forma de convertirlos.

> 💡 Los minutos pueden ser un número de un solo dígito (ej: `9`). El formato esperado es `09`.

---

### Tarea 6 — Decidir la imagen de fondo

Escribí una función que reciba el tipo de clima (ese dato de `data.weather[0].main`) y retorne el nombre del archivo de imagen que corresponde. Si el valor no coincide con ninguno conocido, retorná la imagen por defecto.

> 💡 Tipos posibles que devuelve OWM: `Clear`, `Clouds`, `Rain`, `Drizzle`, `Thunderstorm`, `Snow`, `Mist`, `Fog`, `Haze`, `Smoke`, `Squall`, `Tornado`. No todos tienen imagen propia — varios pueden compartir la misma.

> 💡 No modifiques el CSS. El overlay oscuro ya está resuelto con `::after`. Desde JS solo cambiás el `backgroundImage` del contenedor.

---

### Tarea 7 — Punto de entrada y lógica de inicio

Escribí una función que sea el punto de entrada de la app y tome la decisión de cómo obtener el clima inicial. El orden de prioridad:

1. Si hay una ciudad guardada en `localStorage` → usala  
2. Si no, intentá obtener la ubicación del usuario con la API del navegador  
3. Si el usuario no da permiso, o el navegador no lo soporta → usá las coordenadas por defecto

> 💡 `navigator.geolocation.getCurrentPosition` recibe dos callbacks: uno para cuando el usuario acepta, otro para cuando rechaza o hay un error.

---

### Tarea 8 — Eventos

Conectá la lógica a la interfaz:

- **Input de búsqueda**: cuando el usuario termina de escribir y confirma, disparar la búsqueda. Validá que el campo no esté vacío.  
- **Botón guardar**: persistir la ciudad que se está mostrando actualmente y darle feedback al usuario.  
- **Botón limpiar**: eliminar la ciudad guardada, limpiar el input y resetear el botón guardar.

> 💡 Para el input, pensá qué evento y qué condición tiene que cumplirse para disparar la búsqueda.