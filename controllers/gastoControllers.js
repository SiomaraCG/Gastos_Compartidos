const Gasto = require('../models/gastoModel');
const Grupo = require('../models/grupoModel'); 

exports.createExpense = async (req, res) => {
  try {
    const { nombre, precio, nCuotas, grupo } = req.body;

    // Verifica que el grupo exista en la base de datos
    const grupoExistente = await Grupo.findById(grupo);
    if (!grupoExistente) {
      return res.status(400).json({ error: 'Grupo no encontrado' });
    }

    const nuevoGasto = new Gasto({
      nombre,
      precio,
      nCuotas,
      grupo,
    });

    const gasto = await nuevoGasto.save();
    res.status(201).json({ message: 'Gasto creado exitosamente', gasto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllExpenses = async (req, res) => {
  try {
    const gastos = await Gasto.find().populate('grupo');
    res.status(200).json(gastos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const gasto = await Gasto.findById(req.params.id).populate('grupo');
    if (!gasto) return res.status(404).json({ error: 'Gasto no encontrado' });
    res.status(200).json(gasto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const { nombre, precio, nCuotas, grupo } = req.body;

    // Verifica que el grupo exista en la base de datos
    const grupoExistente = await Grupo.findById(grupo);
    if (!grupoExistente) {
      return res.status(400).json({ error: 'Grupo no encontrado' });
    }

    const gasto = await Gasto.findByIdAndUpdate(req.params.id, { nombre, precio, nCuotas, grupo }, { new: true }).populate('grupo');
    if (!gasto) return res.status(404).json({ error: 'Gasto no encontrado' });
    res.status(200).json({ message: 'Gasto actualizado exitosamente', gasto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const gasto = await Gasto.findByIdAndDelete(req.params.id);
    if (!gasto) return res.status(404).json({ error: 'Gasto no encontrado' });
    res.status(200).json({ message: 'Gasto eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
