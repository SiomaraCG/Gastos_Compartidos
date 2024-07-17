const Grupo = require('../models/grupoModel');

exports.createExpense = async (req, res) => {
  try {
    const { nombre, descripcion, integrantes } = req.body;

    const nuevoGrupo = new Grupo({
      nombre,
      descripcion,
      integrantes,
    });

    const grupo = await nuevoGrupo.save();
    res.status(201).json({ message: 'Grupo creado exitosamente', grupo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const grupos = await Grupo.find();
    res.status(200).json(grupos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const grupo = await Grupo.findById(req.params.id);
    if (!grupo) return res.status(404).json({ error: 'Grupo no encontrado' });
    res.status(200).json(grupo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const grupo = await Grupo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!grupo) return res.status(404).json({ error: 'Grupo no encontrado' });
    res.status(200).json({ message: 'Grupo actualizado exitosamente', grupo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const grupo = await Grupo.findByIdAndDelete(req.params.id);
    if (!grupo) return res.status(404).json({ error: 'Grupo no encontrado' });
    res.status(200).json({ message: 'Grupo eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
