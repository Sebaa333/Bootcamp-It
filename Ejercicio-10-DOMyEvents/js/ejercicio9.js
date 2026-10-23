// Ejercicio 9: Lista dinámica de contactos
//
// Abrí ejercicio9.html. Hay un formulario para agregar contactos, un buscador
// y una lista vacía. Vas a construir toda la lógica desde cero.
//
// El estado de la app vive en este array (no en el DOM):
//
//   let contactos = [
//     { id: 1, nombre: "Ana García",    email: "ana@email.com"    },
//     { id: 2, nombre: "Bruno López",   email: "bruno@email.com"  },
//     { id: 3, nombre: "Camila Torres", email: "camila@email.com" },
//     { id: 4, nombre: "Diego Romero",  email: "diego@email.com"  }
//   ];
//
// 1. Al cargar la página, renderizá todos los contactos.
//    Cada contacto se muestra como un <li> con nombre, email y un botón "✕".
//    Mostrá el contador: "4 contactos"
//    TIP: creá una función renderContactos(lista) que reciba el array filtrado
//         y reconstruya el DOM. La vas a llamar varias veces.
//
// 2. AGREGAR CONTACTO:
//    Al hacer click en "Agregar":
//    a) Leé los valores de #input-nombre y #input-email
//    b) Validá que ninguno esté vacío — si están vacíos, no hagas nada
//    c) Creá un nuevo objeto con un id único y agregalo al array contactos
//    d) Limpiá los inputs y volvé a renderizar
//    TIP: para generar un id único podés usar Date.now()
//
// 3. ELIMINAR CONTACTO:
//    Al hacer click en el botón "✕" de un contacto:
//    a) Obtené el id del contacto desde el atributo data-id del botón
//    b) Filtrá el array para quitar ese contacto
//    c) Volvé a renderizar
//    TIP: usá event delegation — agregá el listener al <ul>, no a cada botón.
//         Verificá con e.target.closest(".btn-eliminar") si el click fue en ese botón.
//
// 4. BUSCAR EN TIEMPO REAL:
//    Al escribir en el buscador, filtrá el array contactos por nombre
//    y renderizá solo los que coincidan. Actualizá el contador.
//    Si no hay resultados, mostrá: "No se encontraron contactos"
//
// IMPORTANTE: el array contactos es siempre la fuente de verdad.
//             Nunca leas el estado desde el DOM — siempre desde el array.

let contactos = [
  { id: 1, nombre: "Ana García",    email: "ana@email.com"    },
  { id: 2, nombre: "Bruno López",   email: "bruno@email.com"  },
  { id: 3, nombre: "Camila Torres", email: "camila@email.com" },
  { id: 4, nombre: "Diego Romero",  email: "diego@email.com"  }
];

const inputNombre = document.querySelector("#input-nombre");
const inputEmail = document.querySelector("#input-email");
const btnAgregar = document.querySelector("#btn-agregar");
const buscador = document.querySelector("#buscador");
const contador = document.querySelector("#contador");
const listaContactos = document.querySelector("#lista-contactos");

// Término de búsqueda vigente (también es estado: no se lee del DOM al renderizar)
let terminoBusqueda = "";

function textoContador(cantidad) {
  if (cantidad === 0) return "No se encontraron contactos";
  if (cantidad === 1) return "1 contacto";
  return `${cantidad} contactos`;
}

// Se construye con createElement + textContent: lo que escribe el usuario nunca se interpreta como HTML
function crearItemContacto(contacto) {
  const li = document.createElement("li");
  li.className = "contacto";

  const info = document.createElement("div");
  info.className = "info";

  const nombre = document.createElement("span");
  nombre.className = "nombre";
  nombre.textContent = contacto.nombre;

  const email = document.createElement("span");
  email.className = "email";
  email.textContent = contacto.email;

  info.append(nombre, email);

  const btnEliminar = document.createElement("button");
  btnEliminar.className = "btn-eliminar";
  btnEliminar.type = "button";
  btnEliminar.dataset.id = contacto.id;
  btnEliminar.setAttribute("aria-label", `Eliminar a ${contacto.nombre}`);
  btnEliminar.textContent = "✕";

  li.append(info, btnEliminar);
  return li;
}

// Reconstruye la lista y el contador a partir del array recibido
function renderContactos(contactosAMostrar) {
  listaContactos.innerHTML = "";
  contactosAMostrar.forEach((contacto) => {
    listaContactos.appendChild(crearItemContacto(contacto));
  });
  contador.textContent = textoContador(contactosAMostrar.length);
}

// Punto único de actualización: aplica la búsqueda vigente sobre el array y renderiza
function actualizarVista() {
  const termino = terminoBusqueda.toLowerCase();
  const filtrados = contactos.filter((contacto) => contacto.nombre.toLowerCase().includes(termino));
  renderContactos(filtrados);
}

// Agregar: si falta nombre o email no se hace nada
btnAgregar.addEventListener("click", () => {
  const nombre = inputNombre.value.trim();
  const email = inputEmail.value.trim();
  if (nombre === "" || email === "") return;

  contactos.push({ id: Date.now(), nombre, email });
  inputNombre.value = "";
  inputEmail.value = "";
  actualizarVista();
});

// Eliminar: event delegation, un único listener en el <ul>
listaContactos.addEventListener("click", (e) => {
  const btnEliminar = e.target.closest(".btn-eliminar");
  if (!btnEliminar) return;

  const id = Number(btnEliminar.dataset.id);
  contactos = contactos.filter((contacto) => contacto.id !== id);
  actualizarVista();
});

// Buscar por nombre en tiempo real
buscador.addEventListener("input", () => {
  terminoBusqueda = buscador.value.trim();
  actualizarVista();
});

// Render inicial
actualizarVista();
