const Balance = require('../models/balanceModel');
const Grupo = require('../models/grupoModel');

exports.createBalance = async (req, res) => {
  try {
    const { presupuesto, grupo } = req.body;

    // Verifica que el grupo exista
    const grupoExistente = await Grupo.findById(grupo);
    if (!grupoExistente) {
      return res.status(400).json({ error: 'Grupo no encontrado' });
    }

    const nuevoBalance = new Balance({
      presupuesto,
      grupo,
    });

    const balance = await nuevoBalance.save();
    res.status(201).json({ message: 'Balance creado exitosamente', balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBalances = async (req, res) => {
  try {
    const balances = await Balance.find().populate('grupo');
    res.status(200).json(balances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBalanceById = async (req, res) => {
  try {
    const balance = await Balance.findById(req.params.id).populate('grupo');
    if (!balance) return res.status(404).json({ error: 'Balance no encontrado' });
    res.status(200).json(balance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBalance = async (req, res) => {
  try {
    const { presupuesto, grupo } = req.body;

    // Verifica que el grupo exista
    const grupoExistente = await Grupo.findById(grupo);
    if (!grupoExistente) {
      return res.status(400).json({ error: 'Grupo no encontrado' });
    }

    const balance = await Balance.findByIdAndUpdate(req.params.id, { presupuesto, grupo }, { new: true }).populate('grupo');
    if (!balance) return res.status(404).json({ error: 'Balance no encontrado' });

    // Actualiza los gastos totales y balancefn
    await balance.updateGastosTotales();
    await balance.save();

    res.status(200).json({ message: 'Balance actualizado exitosamente', balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBalance = async (req, res) => {
  try {
    const balance = await Balance.findByIdAndDelete(req.params.id);
    if (!balance) return res.status(404).json({ error: 'Balance no encontrado' });
    res.status(200).json({ message: 'Balance eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
