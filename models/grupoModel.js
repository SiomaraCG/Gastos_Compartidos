const mongoose = require('mongoose');

const GrupoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  integrantes: {
    type: String,
    required: true,
  },
});

const Grupo = mongoose.model('Grupo', GrupoSchema);

module.exports = Grupo;