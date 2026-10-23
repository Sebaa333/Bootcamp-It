// Importamos mongoose para conectarnos a MongoDB
const mongoose = require('mongoose');

// Función que conecta con la base de datos (usa MONGODB_URI o la base local por defecto)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mundo_pilar');
    console.log('Base de datos conectada');
  } catch (error) {
    console.error('Error al conectar a la base de datos: ', error);
    process.exit(1);
  }
};

// Exportamos la función para usarla en server.cjs y en el seed
module.exports = connectDB;
