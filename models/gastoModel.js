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
  nCuotas: {
    type: Number,
    required: true,
  },
  grupo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grupo',
    required: true,
  },
});

const Gasto = mongoose.model('Gasto', GastoSchema);

module.exports = Gasto;
