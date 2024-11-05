const mongoose = require('mongoose');

const espacioSchema = new mongoose.Schema({
  tipo_espacio: {
    type: String,
    required: true,
  },
  capacidad: {
    type: Number,
    required: true,
  },
  ubicacion: {
    type: String,
    required: true,
  },
  disponibilidad_horaria: [{
    fecha: {
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
  }],
  reservas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reserva', // Referencia a la colección de reservas
  }],
  comentarios: [{
    usuario_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario', // Referencia a la colección de usuarios
    },
    texto: {
      type: String,
      required: true,
    },
    fecha_comentario: {
      type: Date,
      default: Date.now,
    },
  }],
});

module.exports = mongoose.model('Espacio', espacioSchema);
