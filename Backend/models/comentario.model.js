const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comentarioSchema = new Schema({
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  espacio_id: { type: mongoose.Schema.Types.ObjectId, ref: 'EspacioTrabajo', required: true },
  comentario: { type: String, required: true },
  valoracion: { type: Number, required: true },
  fecha_comentario: { type: Date, required: true }
});

module.exports = mongoose.model('Comentario', comentarioSchema);
