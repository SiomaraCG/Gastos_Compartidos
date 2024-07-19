const Autentificacion = require('../models/autentificacionModel');

exports.createAutentificacion = async (req, res) => {
  try {
    const { correo, contrasenia } = req.body;

    const nuevoAutentificacion = new Autentificacion({
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
    const autentificaciones = await Autentificacion.find();
    res.status(200).json(autentificaciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAutentificacionById = async (req, res) => {
  try {
    const autentificacion = await Autentificacion.findById(req.params.id);
    if (!autentificacion) return res.status(404).json({ error: 'Autenticación no encontrada' });
    res.status(200).json(autentificacion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAutentificacion = async (req, res) => {
  try {
    const autentificacion = await Autentificacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
