const Balance = require('../models/balanceModel');

exports.createBalance = async (req, res) => {
  try {
    const { presupuesto } = req.body;

    const nuevoBalance = new Balance({
      presupuesto,
    });

    await nuevoBalance.updateGastosTotales();
    res.status(201).json({ message: 'Balance creado exitosamente', nuevoBalance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBalances = async (req, res) => {
  try {
    const balances = await Balance.find();
    res.status(200).json(balances);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBalanceById = async (req, res) => {
  try {
    const balance = await Balance.findById(req.params.id);
    if (!balance) return res.status(404).json({ error: 'Balance no encontrado' });
    res.status(200).json(balance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBalance = async (req, res) => {
  try {
    const balance = await Balance.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!balance) return res.status(404).json({ error: 'Balance no encontrado' });

    await balance.updateGastosTotales();
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
