const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Referencia a la colección de usuarios
    required: true,
  },
  espacio_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Espacio', // Referencia a la colección de espacios
    required: true,
  },
  fecha_reserva: {
    type: Date,
    required: true,
  },
  hora_inicio: {
    type: Date,
    required: true,
  },
  hora_fin: {
    type: Date,
    required: true,
  },
  estado: {
    type: String,
    enum: ['confirmada', 'cancelada'],
    default: 'confirmada',
  },
});

module.exports = mongoose.model('Reserva', reservaSchema);
