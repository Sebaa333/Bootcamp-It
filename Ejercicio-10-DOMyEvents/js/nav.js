// Barra de navegación entre ejercicios y botón para volver al índice al final de la página.
// No forma parte de la consigna: solo facilita recorrer y corregir los ejercicios.
// Se carga después del script de cada ejercicio para no alterar el DOM que este manipula.
// Usa solo <nav>, <a> y <span> con clases propias, porque algunos CSS estilan ul, li y button globalmente.

(() => {
  const TOTAL_EJERCICIOS = 9;

  const coincidencia = location.pathname.match(/ejercicio(\d+)\.html$/);
  if (!coincidencia) return;

  const actual = Number(coincidencia[1]);
  const enlaceIndice = `<a class="nav-ejercicios-link" href="index.html">← Volver al índice</a>`;

  const estilos = document.createElement("style");
  estilos.textContent = `
    .nav-ejercicios {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 28px;
      padding: 12px 14px;
      border: 1px solid #d4d4d8;
      border-radius: 10px;
      background: #f8fafc;
      color: #1e293b;
      font-family: system-ui, sans-serif;
      font-size: 14px;
      line-height: 1.4;
    }
    .nav-ejercicios-fila,
    .nav-ejercicios-numeros,
    .nav-ejercicios-flechas {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
    }
    .nav-ejercicios-fila { justify-content: space-between; }
    .nav-ejercicios-posicion { font-weight: 600; }
    .nav-ejercicios-link {
      display: inline-block;
      min-width: 32px;
      padding: 4px 10px;
      border: 1px solid #cbd5e1;
      border-radius: 6px;
      background: #ffffff;
      color: #1e293b;
      text-align: center;
      text-decoration: none;
      box-sizing: border-box;
    }
    .nav-ejercicios-link:hover { border-color: #2563eb; color: #2563eb; }
    .nav-ejercicios-link:focus-visible { outline: 2px solid #2563eb; outline-offset: 2px; }
    .nav-ejercicios-actual,
    .nav-ejercicios-actual:hover { border-color: #2563eb; background: #2563eb; color: #ffffff; }
    .nav-ejercicios-deshabilitado { opacity: 0.4; pointer-events: none; }
    .nav-ejercicios-pie {
      margin-top: 32px;
      font-family: system-ui, sans-serif;
      font-size: 14px;
      line-height: 1.4;
    }
  `;
  document.head.appendChild(estilos);

  const crearFlecha = (texto, numero) => {
    if (numero < 1 || numero > TOTAL_EJERCICIOS) {
      return `<span class="nav-ejercicios-link nav-ejercicios-deshabilitado" aria-disabled="true">${texto}</span>`;
    }
    return `<a class="nav-ejercicios-link" href="ejercicio${numero}.html">${texto}</a>`;
  };

  const numeros = Array.from({ length: TOTAL_EJERCICIOS }, (_, i) => i + 1)
    .map((numero) => {
      if (numero === actual) {
        return `<a class="nav-ejercicios-link nav-ejercicios-actual" href="ejercicio${numero}.html" aria-current="page">${numero}</a>`;
      }
      return `<a class="nav-ejercicios-link" href="ejercicio${numero}.html">${numero}</a>`;
    })
    .join("");

  document.body.insertAdjacentHTML(
    "afterbegin",
    `
    <nav class="nav-ejercicios" aria-label="Navegación entre ejercicios">
      <span class="nav-ejercicios-fila">
        ${enlaceIndice}
        <span class="nav-ejercicios-posicion">Ejercicio ${actual} de ${TOTAL_EJERCICIOS}</span>
        <span class="nav-ejercicios-flechas">
          ${crearFlecha("← Anterior", actual - 1)}
          ${crearFlecha("Siguiente →", actual + 1)}
        </span>
      </span>
      <span class="nav-ejercicios-numeros">${numeros}</span>
    </nav>
    `
  );

  document.body.insertAdjacentHTML(
    "beforeend",
    `<nav class="nav-ejercicios-pie" aria-label="Volver al índice">${enlaceIndice}</nav>`
  );
})();
