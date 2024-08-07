const mongoose = require('mongoose');

const BalanceSchema = new mongoose.Schema({
  presupuesto: {
    type: Number,
    required: true,
  },
  gastosTotales: {
    type: Number,
    default: 0,
  },
  balancefn: {
    type: Number,
    default: function() {
      return this.presupuesto - this.gastosTotales;
    },
  },
  grupo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Grupo',
    required: true,
  },
});

BalanceSchema.methods.updateGastosTotales = async function() {
  const Gasto = mongoose.model('Gasto');
  const gastos = await Gasto.aggregate([
    { $match: { grupo: this.grupo } }, // Filtra los gastos por el grupo específico
    { $group: { _id: null, total: { $sum: '$precio' } } }
  ]);

  this.gastosTotales = gastos.length > 0 ? gastos[0].total : 0;
  this.balancefn = this.presupuesto - this.gastosTotales;
};

BalanceSchema.pre('save', async function(next) {
  await this.updateGastosTotales();
  next();
});

const Balance = mongoose.model('Balance', BalanceSchema);

module.exports = Balance;
