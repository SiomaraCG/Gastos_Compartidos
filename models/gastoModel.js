const mongoose = require('mongoose');
const Grupo = require('./grupoModel');

const GastoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  fechaVencimiento: {
    type: Date,
    required: true,
  },
  grupo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grupo',
    required: true,
  },
  usuarioCreador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
});

const Gasto = mongoose.model('Gasto', GastoSchema);

module.exports = Gasto;
