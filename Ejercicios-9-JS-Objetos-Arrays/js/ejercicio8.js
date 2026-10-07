// Ejercicio 8: Modificar un objeto
//
// Partí de este objeto producto con estas propiedades:
//
//     name         => "Auriculares",
//     price        => 15000,
//     stock        => 10,
//     active       => true,
//     descripción  => "Auriculares inalámbricos con cancelación de ruido"
//
// Realizá estas operaciones EN ORDEN y mostrá el objeto después de cada una:
//   1. Cambiá el precio a 12000
//   2. Reducí el stock en 3 unidades
//   3. Agregá una nueva propiedad "marca" con valor "Sony"
//   4. Eliminá la propiedad "active"
//   5. Agregar una nueva propiedad "category" con valor "Electrónica"
//   6. Agregar una propiedad "specs" que será otro objeto con estas propiedades:
//      color: "Negro", weight: "200g", wireless: true, batteryLife: "20h"
//   7. Mostrar el valor de la propiedad "batteryLife" dentro de specs
//   8. Mostrar el valor de la propiedad "color" dentro de specs
//
// Resultado esperado:
//   1. { name: 'Auriculares', price: 12000, stock: 10, active: true, descripción: 'Auriculares inalámbricos con cancelación de ruido' }
//   2. { name: 'Auriculares', price: 12000, stock: 7, active: true, descripción: 'Auriculares inalámbricos con cancelación de ruido' }
//   3. { name: 'Auriculares', price: 12000, stock: 7, active: true, descripción: 'Auriculares inalámbricos con cancelación de ruido', marca: 'Sony' }
//   4. { name: 'Auriculares', price: 12000, stock: 7, descripción: 'Auriculares inalámbricos con cancelación de ruido', marca: 'Sony' }
//   5. { name: 'Auriculares', price: 12000, stock: 7, descripción: 'Auriculares inalámbricos con cancelación de ruido', marca: 'Sony', category: 'Electrónica' }
//   6. { name: 'Auriculares', price: 12000, stock: 7, descripción: 'Auriculares inalámbricos con cancelación de ruido', marca: 'Sony', category: 'Electrónica', specs: { color: 'Negro', weight: '200g', wireless: true, batteryLife: '20h' } }
//   7. "20h"
//   8. "Negro" 

// TIP: para eliminar una propiedad usá: delete objeto.propiedad

