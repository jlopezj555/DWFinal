const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3001
const productoRoutes = require('./routes/usuario.routes')
//IMPORTANTE PARA ACEPTAR JSON
app.use(express.json());

app.use('/api', productoRoutes);


app.listen(port, () => {
    console.log('El servidor está listo')
});

mongoose.connect('mongodb://127.0.0.1:27017/DWFinal').then(()=>{
    console.log('Conexion a MongoDB exitosa')
});