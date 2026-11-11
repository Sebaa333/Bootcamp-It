// =============================================
// Ejercicio 11 — App Clima
// =============================================

// ---------------------------------------------
// Tarea 1 — Configuración inicial
// ---------------------------------------------

const API_KEY  = "446c5031cc466856c4deb64f58fec0c4"; 
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const ICON_URL = "https://openweathermap.org/img/wn";
const IMG_PATH = "assets/images";

// Coordenadas por defecto: Buenos Aires
const LAT_DEFAULT = -34.6037;
const LON_DEFAULT = -58.3816;

const STORAGE_KEY = "clima-ciudad";

// Parámetros comunes a todas las consultas
const PARAMS_BASE = {
  appid: API_KEY,
  units: "metric",
  lang: "es",
};

// Referencias al DOM
const contenedor   = document.querySelector(".weather-container");
const inputCiudad  = document.getElementById("input-ciudad");
const btnGuardar   = document.getElementById("btn-guardar");
const btnLimpiar   = document.getElementById("btn-limpiar");
const elIcono      = document.getElementById("icono");
const elCiudad     = document.getElementById("ciudad");
const elTemp       = document.getElementById("temperatura");
const elTempMax    = document.getElementById("temp-max");
const elTempMin    = document.getElementById("temp-min");
const elDescripcion = document.getElementById("descripcion");
const elSensacion  = document.getElementById("sensacion");
const elHumedad    = document.getElementById("humedad");
const elViento     = document.getElementById("viento");
const elFechaHora  = document.getElementById("fecha-hora");

// Ciudad que se está mostrando actualmente (nombre normalizado por la API)
let ciudadActual = null;


// ---------------------------------------------
// Tarea 2 — Consulta a la API por coordenadas
// ---------------------------------------------

async function obtenerClimaPorCoordenadas(lat, lon) {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: { ...PARAMS_BASE, lat, lon },
    });
    renderClima(data);
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "No se pudo obtener el clima para tu ubicación. Intentá de nuevo más tarde.",
    });
  }
}


// ---------------------------------------------
// Tarea 3 — Consulta a la API por nombre de ciudad
// ---------------------------------------------

async function obtenerClimaPorCiudad(ciudad) {
  try {
    const { data } = await axios.get(BASE_URL, {
      params: { ...PARAMS_BASE, q: ciudad },
    });
    renderClima(data);

    // Guardamos el nombre normalizado que devuelve la API, no lo que escribió el usuario
    localStorage.setItem(STORAGE_KEY, data.name);
    btnGuardar.disabled = false;
  } catch (error) {
    console.error(error);
    const noEncontrada = error.response && error.response.status === 404;
    Swal.fire({
      icon: noEncontrada ? "warning" : "error",
      title: noEncontrada ? "Ciudad no encontrada" : "Error",
      text: noEncontrada
        ? `No encontramos ninguna ciudad llamada "${ciudad}". Revisá cómo la escribiste.`
        : "No se pudo consultar el clima. Intentá de nuevo más tarde.",
    });
  }
}


// ---------------------------------------------
// Tarea 4 — Mostrar los datos en pantalla
// ---------------------------------------------

function renderClima(data) {
  const { name, main, weather, wind, sys } = data;
  const clima = weather[0];

  ciudadActual = name;

  elCiudad.textContent      = sys && sys.country ? `${name}, ${sys.country}` : name;
  elTemp.textContent        = `${Math.round(main.temp)}°C`;
  elTempMax.textContent     = `${Math.round(main.temp_max)}°`;
  elTempMin.textContent     = `${Math.round(main.temp_min)}°`;
  elDescripcion.textContent = clima.description;

  elIcono.src = `${ICON_URL}/${clima.icon}@2x.png`;
  elIcono.alt = clima.description;

  elSensacion.textContent = `${Math.round(main.feels_like)}°C`;
  elHumedad.textContent   = `${main.humidity}%`;
  // La API devuelve m/s con units=metric; lo pasamos a km/h
  elViento.textContent    = `${Math.round(wind.speed * 3.6)} km/h`;

  elFechaHora.textContent = obtenerFechaFormateada();

  contenedor.style.backgroundImage = `url('${IMG_PATH}/${obtenerImagenFondo(clima.main)}')`;
}


// ---------------------------------------------
// Tarea 5 — Fecha y hora formateada
// ---------------------------------------------

function obtenerFechaFormateada() {
  const dias = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];

  const ahora   = new Date();
  const dia     = dias[ahora.getDay()];
  const fecha   = ahora.getDate();
  const mes     = meses[ahora.getMonth()];
  const anio    = ahora.getFullYear();
  const horas   = String(ahora.getHours()).padStart(2, "0");
  const minutos = String(ahora.getMinutes()).padStart(2, "0");

  return `${dia}, ${fecha} de ${mes} de ${anio} — ${horas}:${minutos}`;
}


// ---------------------------------------------
// Tarea 6 — Decidir la imagen de fondo
// ---------------------------------------------

function obtenerImagenFondo(main) {
  // Solo se mapea a archivos que existen en assets/images/
  const imagenes = {
    Rain: "rain.jpg",
    Drizzle: "drizzle.jpg",
    Thunderstorm: "thunderstorm.webp",
    Snow: "snow.jpg",
    Mist: "fog.jpg",
    Fog: "fog.jpg",
    Haze: "fog.jpg",
    Smoke: "fog.jpg",
    Dust: "fog.jpg",
    Sand: "fog.jpg",
    Ash: "fog.jpg",
    Squall: "tornado.webp",
    Tornado: "tornado.webp",
  };

  return imagenes[main] || "default.jpg";
}


// ---------------------------------------------
// Tarea 7 — Punto de entrada y lógica de inicio
// ---------------------------------------------

function init() {
  const ciudadGuardada = localStorage.getItem(STORAGE_KEY);

  // 1. Ciudad guardada en localStorage
  if (ciudadGuardada) {
    inputCiudad.value = ciudadGuardada;
    obtenerClimaPorCiudad(ciudadGuardada);
    return;
  }

  // 3. El navegador no soporta geolocalización → coords por defecto
  if (!("geolocation" in navigator)) {
    obtenerClimaPorCoordenadas(LAT_DEFAULT, LON_DEFAULT);
    return;
  }

  // 2. Ubicación del usuario (o coords por defecto si rechaza / hay error)
  navigator.geolocation.getCurrentPosition(
    (posicion) => {
      const { latitude, longitude } = posicion.coords;
      obtenerClimaPorCoordenadas(latitude, longitude);
    },
    () => {
      obtenerClimaPorCoordenadas(LAT_DEFAULT, LON_DEFAULT);
    }
  );
}


// ---------------------------------------------
// Tarea 8 — Eventos
// ---------------------------------------------

// Buscar cuando el usuario confirma con Enter
inputCiudad.addEventListener("keydown", (e) => {
  if (e.key !== "Enter") return;

  const ciudad = inputCiudad.value.trim();
  if (!ciudad) {
    Swal.fire({
      icon: "info",
      title: "Campo vacío",
      text: "Escribí el nombre de una ciudad para buscar.",
    });
    return;
  }

  obtenerClimaPorCiudad(ciudad);
});

// Guardar la ciudad que se está mostrando
btnGuardar.addEventListener("click", () => {
  if (!ciudadActual) return;

  localStorage.setItem(STORAGE_KEY, ciudadActual);
  Swal.fire({
    icon: "success",
    title: "Ciudad guardada",
    text: `${ciudadActual} se mostrará la próxima vez que abras la app.`,
    timer: 2000,
    showConfirmButton: false,
  });
});

// Limpiar la ciudad guardada y resetear la interfaz
btnLimpiar.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  inputCiudad.value = "";
  btnGuardar.disabled = true;
  Swal.fire({
    icon: "info",
    title: "Ciudad eliminada",
    text: "Ya no hay ninguna ciudad guardada.",
    timer: 2000,
    showConfirmButton: false,
  });
});


init();
