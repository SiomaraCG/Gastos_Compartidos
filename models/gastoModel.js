const mongoose = require('mongoose');
const Grupo = require('./grupoModel'); // Asegúrate de que la ruta sea correcta

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
