const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3001;
const routes = require('./routes/index.routes'); // Ruta al archivo de rutas principal

// Middlewares
app.use(express.json());

// Rutas
app.use('/api', routes); // Agrega el prefijo '/api' para todas las rutas

mongoose.connect('mongodb://127.0.0.1:27017/DWFinal').then(()=>{
    console.log('Conexion a MongoDB exitosa')
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
