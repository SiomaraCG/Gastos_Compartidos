const mongoose = require('mongoose');

const AutentificacionSchema = new mongoose.Schema({
  correo: {
    type: String,
    required: true,
  },
  contrasenia: {
    type: String,
    required: true,
  },
});

const Autentificacion = mongoose.model('Autentificacion', AutentificacionSchema);

module.exports = Autentificacion;