// Ejercicio 5: Tabs
//
// Abrí ejercicio5.html. Hay tres botones de tab y tres secciones de contenido.
// Solo una sección debe estar visible a la vez.
//
// El HTML ya tiene la primera tab activa (clase "activo" en el botón y en la sección).
//
// Implementá el comportamiento de las tabs:
//
// 1. Seleccioná todos los botones con clase "tab-btn" usando querySelectorAll.
//    Agregá un addEventListener "click" a cada uno.
//    TIP: podés recorrer la NodeList con forEach y agregarle un listener a cada botón.
//
// 2. Al hacer click en un botón:
//    a) Quitá la clase "activo" de TODOS los botones
//    b) Quitá la clase "activo" de TODOS los contenidos
//    c) Agregá la clase "activo" al botón clickeado
//    d) Agregá la clase "activo" al contenido correspondiente
//    TIP: cada botón tiene un atributo data-tab con el id del contenido que debe mostrar.
//         Usá ese valor para seleccionar el contenido correcto:
//         document.querySelector(`#${tab}`)
//
// Resultado esperado:
//   Al clickear "Especificaciones" → se muestra esa sección, las otras se ocultan
//   Al clickear "Reviews"         → ídem
//   Al clickear "Descripción"     → vuelve al estado inicial

const botones = document.querySelectorAll(".tab-btn");
const contenidos = document.querySelectorAll(".tab-contenido");

botones.forEach((boton) => {
  boton.addEventListener("click", () => {
    // data-tab guarda el id del contenido que corresponde a este botón
    const contenido = document.querySelector(`#${boton.dataset.tab}`);
    if (!contenido) return;

    // Primero se limpia todo y después se activa solo lo que corresponde
    botones.forEach((b) => b.classList.remove("activo"));
    contenidos.forEach((c) => c.classList.remove("activo"));

    boton.classList.add("activo");
    contenido.classList.add("activo");
  });
});
