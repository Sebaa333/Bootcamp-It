/*
  Ejercicio 4: Estación del año
  ==============================
  Pedir al usuario que ingrese el número de `mes` con un valor del 1 al 12.

  Mostrar la estación del año correspondiente (hemisferio sur):
    - Meses 12, 1, 2  → "Verano"
    - Meses 3, 4, 5   → "Otoño"
    - Meses 6, 7, 8   → "Invierno"
    - Meses 9, 10, 11 → "Primavera"

  let mes = 7;

  Resultado esperado:
    Invierno

  Requisitos técnicos:
    - Usar if / else if / else
    - Usar || (OR) para agrupar los meses de cada estación
*/

const mes = Number(prompt("Ingresá el número de mes (1 al 12):"));

if (mes === 12 || mes === 1 || mes === 2) {
  console.log("Verano");
} else if (mes === 3 || mes === 4 || mes === 5) {
  console.log("Otoño");
} else if (mes === 6 || mes === 7 || mes === 8) {
  console.log("Invierno");
} else if (mes === 9 || mes === 10 || mes === 11) {
  console.log("Primavera");
} else {
  console.log("Mes inválido");
}
