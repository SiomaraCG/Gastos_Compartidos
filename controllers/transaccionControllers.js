const Transaccion = require('../models/transaccionModel');

exports.createTransaction = async (req, res) => {
  try {
    const { monto, fecha, usuario, grupo, gasto } = req.body;

    const nuevaTransaccion = new Transaccion({
      monto,
      fecha,
      usuario,
      grupo,
      gasto,
    });

    const transaccion = await nuevaTransaccion.save();
    res.status(201).json({ message: 'Transacción creada exitosamente', transaccion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const transacciones = await Transaccion.find();
    res.status(200).json(transacciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaccion = await Transaccion.findById(req.params.id);
    if (!transaccion) return res.status(404).json({ error: 'Transacción no encontrada' });
    res.status(200).json(transaccion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const transaccion = await Transaccion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!transaccion) return res.status(404).json({ error: 'Transacción no encontrada' });
    res.status(200).json({ message: 'Transacción actualizada exitosamente', transaccion });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaccion = await Transaccion.findByIdAndDelete(req.params.id);
    if (!transaccion) return res.status(404).json({ error: 'Transacción no encontrada' });
    res.status(200).json({ message: 'Transacción eliminada exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
