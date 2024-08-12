const Autentificacion = require('../models/autentificacionModel');
const Usuario = require('../models/usuarioModel');

exports.createAutentificacion = async (req, res) => {
  try {
    const { usuario, correo, contrasenia } = req.body;

    // Verifica que el usuario exista
    const usuarioExistente = await Usuario.findById(usuario);
    if (!usuarioExistente) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const nuevoAutentificacion = new Autentificacion({
      usuario,
      correo,
      contrasenia,
    });

    const autentificacion = await nuevoAutentificacion.save();
    res.status(201).json({ message: 'Autenticación creada exitosamente', autentificacion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAutentificaciones = async (req, res) => {
  try {
    const autentificaciones = await Autentificacion.find().populate('usuario', 'nombre');
    res.status(200).json(autentificaciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAutentificacionById = async (req, res) => {
  try {
    const autentificacion = await Autentificacion.findById(req.params.id).populate('usuario', 'nombre');
    if (!autentificacion) return res.status(404).json({ error: 'Autenticación no encontrada' });
    res.status(200).json(autentificacion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAutentificacion = async (req, res) => {
  try {
    const { correo, contrasenia } = req.body;
    const autentificacion = await Autentificacion.findByIdAndUpdate(
      req.params.id,
      { correo, contrasenia },
      { new: true }
    ).populate('usuario', 'nombre');
    
    if (!autentificacion) return res.status(404).json({ error: 'Autenticación no encontrada' });
    res.status(200).json({ message: 'Autenticación actualizada exitosamente', autentificacion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAutentificacion = async (req, res) => {
  try {
    const autentificacion = await Autentificacion.findByIdAndDelete(req.params.id);
    if (!autentificacion) return res.status(404).json({ error: 'Autenticación no encontrada' });
    res.status(200).json({ message: 'Autenticación eliminada exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
