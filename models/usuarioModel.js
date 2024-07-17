const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true,
    },
    fechaNacimiento: {
      type: Date,
      required: true,
    },
    nTelefono: {
      type: Number,
      required: true,
    },
  });
  
  const Usuario = mongoose.model('Usuario', UsuarioSchema);
  
  module.exports = Usuario;