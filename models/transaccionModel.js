const mongoose = require('mongoose');

const TransaccionSchema = new mongoose.Schema({
  monto: {
    type: Number,
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
    required: true,
  },
  usuario: {
    type: String,
    required: true,
  },
  grupo: {
    type: String,
    required: true,
  },
  gasto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gasto',
    required: true,
  },
});

const Transaccion = mongoose.model('Transaccion', TransaccionSchema);

module.exports = Transaccion;
