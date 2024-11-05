const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contraseña: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ['usuario', 'administrador'],
    default: 'usuario',
  },
  fecha_creacion: {
    type: Date,
    default: Date.now,
  },
  historial_reservas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reserva', // Referencia a la colección de reservas
  }],
});

module.exports = mongoose.model('Usuario', usuarioSchema);
