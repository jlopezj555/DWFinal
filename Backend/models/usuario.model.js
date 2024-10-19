const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, enum: ['usuario', 'administrador'], required: true },
  historial_reservas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reserva' }],
  fecha_creacion: { type: Date, required: true }
});

module.exports = mongoose.model('Usuario', usuarioSchema);
