// Cargamos las variables de entorno del archivo .env
require('dotenv').config();
const app = require('./app.cjs');
const connectDB = require('./conexion/conexion.cjs');

const PORT = process.env.PORT || 3000;

// Primero conectamos a la base de datos y después levantamos el servidor
connectDB().then(() => {
  // En Express 5 el callback recibe el error si el puerto no se pudo abrir (por ejemplo, ya está en uso)
  app.listen(PORT, (error) => {
    if (error) {
      console.error(`No se pudo levantar el servidor en el puerto ${PORT}: `, error.message);
      process.exit(1);
    }
    console.log(`Servidor levantado en el puerto http://localhost:${PORT}`);
  });
});
