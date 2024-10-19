const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservaSchema = new Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  espacio_id: { type: mongoose.Schema.Types.ObjectId, ref: 'EspacioTrabajo', required: true },
  fecha_reserva: { type: Date, required: true },
  hora_inicio: { type: Date, required: true },
  hora_fin: { type: Date, required: true },
  estado: { type: String, required: true }
});

module.exports = mongoose.model('Reserva', reservaSchema);
