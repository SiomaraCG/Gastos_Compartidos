const mongoose = require('mongoose');

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
});

const Gasto = mongoose.model('Gasto', GastoSchema);

module.exports = Gasto;
