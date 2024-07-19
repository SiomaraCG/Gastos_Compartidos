const Usuario = require('../models/usuarioModel');

exports.createUser = async (req, res) => {
  try {
    const { nombre, fechaNacimiento, nTelefono } = req.body;

    const nuevoUsuario = new Usuario({
      nombre,
      fechaNacimiento,
      nTelefono,
    });

    const usuario = await nuevoUsuario.save();
    res.status(201).json({ message: 'Usuario creado exitosamente', usuario });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.status(200).json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json(usuario);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario actualizado exitosamente', usuario });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
