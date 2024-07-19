const mongoose = require('mongoose');
const Usuario = require('./usuarioModel');

const GrupoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  integrantes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  }],
});

const Grupo = mongoose.model('Grupo', GrupoSchema);

module.exports = Grupo;
