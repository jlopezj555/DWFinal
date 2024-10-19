const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const espacioTrabajoSchema = new Schema({
  tipo_espacio: { type: String, required: true },
  capacidad: { type: Number, required: true },
  ubicacion: { type: String, required: true },
  disponibilidad_horaria: [
    {
      fecha: { type: Date, required: true },
      hora_inicio: { type: Date, required: true },
      hora_fin: { type: Date, required: true }
    }
  ],
  reservas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reserva' }],
  comentarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comentario' }]
});

module.exports = mongoose.model('EspacioTrabajo', espacioTrabajoSchema);
