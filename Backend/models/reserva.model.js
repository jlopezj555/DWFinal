const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  espacio_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Espacio',
    required: true,
  },
  fecha_reserva: {
    type: Date,
    required: true,
  },
  hora_inicio: {
    type: String,  // Tipo String
    required: true,
  },
  hora_fin: {
    type: String,  // Tipo String
    required: true,
  },
  estado: {
    type: String,
    enum: ['confirmada', 'cancelada'],
    default: 'confirmada',
  },
});

module.exports = mongoose.model('Reserva', reservaSchema);

