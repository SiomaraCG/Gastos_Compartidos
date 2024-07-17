const Usuario = require('../models/usuarioModel');

exports.createExpense = async (req, res) => {
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

exports.getAllExpenses = async (req, res) => {
    try {
      const usuarios = await Gasto.find();
      res.status(200).json(usuarios);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

exports.getExpenseById = async (req, res) => {
    try {
      const usuario = await Usuario.findById(req.params.id);
      if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.status(200).json(usuario);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
};

exports.updateExpense = async (req, res) => {
    try {
      const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.status(200).json({ message: 'Usuario actualizado exitosamente', gasto });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  exports.deleteExpense = async (req, res) => {
    try {
      const usuario = await Gasto.findByIdAndDelete(req.params.id);
      if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
      res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  