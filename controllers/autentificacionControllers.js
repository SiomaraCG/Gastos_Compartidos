const Autentificacion = require('../models/autentificacionModel');

exports.createExpense = async (req, res) => {
  try {
    const { correo, contrasenia } = req.body;

    const nuevoAutentificacion = new Autentificacion({
        correo,
        contrasenia,
    
    });

    const autentificacion = await nuevoAutentificacion.save();
    res.status(201).json({ message: 'Autentificacion creado exitosamente', autentificacion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const autentificaciones = await Autentificacion.find();
    res.status(200).json(autentificaciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const autentificacion = await Autentificacion.findById(req.params.id);
    if (!autentificacion) return res.status(404).json({ error: 'Autentificacion no encontrado' });
    res.status(200).json(autentificacion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const autentificacion = await Autentificacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!autentificacion) return res.status(404).json({ error: 'Autentificacion no encontrado' });
    res.status(200).json({ message: 'Autentificacion actualizado exitosamente', gasto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const autentificacion = await Autentificacion.findByIdAndDelete(req.params.id);
    if (!autentificacion) return res.status(404).json({ error: 'Autentificacion no encontrado' });
    res.status(200).json({ message: 'Autentificacion eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
