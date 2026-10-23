// Ejercicio 4: Contador con límite
//
// Abrí ejercicio4.html. Hay un contador con dos botones (+ y -) y un <span> que
// muestra el valor actual.
//
// Implementá la lógica completa del contador:
//
// 1. Al hacer click en "+" el valor aumenta de 1 en 1. Máximo: 10.
//    Al hacer click en "−" el valor disminuye de 1 en 1. Mínimo: 0.
//    TIP: guardá el valor actual en una variable, no lo leas del DOM cada vez.
//         Modificá la variable y luego actualizá el textContent del <span>.
//
// 2. Cuando el valor llega a 0, el botón "−" se deshabilita.
//    Cuando el valor llega a 10, el botón "+" se deshabilita.
//    TIP: boton.disabled = true  →  deshabilita el botón
//         boton.disabled = false →  lo vuelve a habilitar
//
// 3. En el <p#mensaje> mostrá:
//    - "Mínimo alcanzado" cuando el valor es 0
//    - "Máximo alcanzado" cuando el valor es 10
//    - "" (vacío) en cualquier otro caso
//
// 4. Permitir que el usuario configure el máximo.
//    Hacé que el límite sea una constante definida al inicio del archivo,
//    de forma que cambiar ese único valor ajuste todo el comportamiento.

// Límites del contador: cambiar MAXIMO ajusta todo el comportamiento
const MAXIMO = 10;
const MINIMO = 0;

const btnRestar = document.querySelector("#btn-restar");
const btnSumar = document.querySelector("#btn-sumar");
const spanValor = document.querySelector("#valor");
const mensaje = document.querySelector("#mensaje");

// Estado: el valor vive en esta variable, el DOM solo lo refleja
let valor = MINIMO;

function actualizarContador() {
  spanValor.textContent = valor;
  btnRestar.disabled = valor <= MINIMO;
  btnSumar.disabled = valor >= MAXIMO;

  if (valor <= MINIMO) {
    mensaje.textContent = "Mínimo alcanzado";
  } else if (valor >= MAXIMO) {
    mensaje.textContent = "Máximo alcanzado";
  } else {
    mensaje.textContent = "";
  }
}

btnSumar.addEventListener("click", () => {
  if (valor < MAXIMO) {
    valor++;
  }
  actualizarContador();
});

btnRestar.addEventListener("click", () => {
  if (valor > MINIMO) {
    valor--;
  }
  actualizarContador();
});

// Estado inicial correcto al cargar (0: "−" deshabilitado y "Mínimo alcanzado")
actualizarContador();
