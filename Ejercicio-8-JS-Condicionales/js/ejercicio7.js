/*
  Ejercicio 11: Clasificación de velocidad
  ==========================================
  Pedir al usuario que ingrese la `velocidad` (en km/h).

  Mostrar la categoría correspondiente:
    - Menor a 60                  → "Velocidad baja"
    - Entre 60 y 120 (inclusive)  → "Velocidad normal"
    - Mayor a 120 y hasta 150     → "Velocidad alta"
    - Mayor a 150                 → "Exceso de velocidad"

  let velocidad = 135;

  Resultado esperado:
    Velocidad alta

  Requisitos técnicos:
    - Usar if / else if / else con 4 ramas
    - Usar && para los rangos intermedios
*/

const velocidad = Number(prompt("Ingresá la velocidad (en km/h):"));

if (velocidad < 60) {
  console.log("Velocidad baja");
} else if (velocidad >= 60 && velocidad <= 120) {
  console.log("Velocidad normal");
} else if (velocidad > 120 && velocidad <= 150) {
  console.log("Velocidad alta");
} else {
  console.log("Exceso de velocidad");
}
