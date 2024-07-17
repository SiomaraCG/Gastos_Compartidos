const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaccionControllers');

router.post('/transacciones', transactionController.createTransaction);
router.post('/transacciones/all', transactionController.getAllTransactions); 
router.post('/transacciones/:id', transactionController.getTransactionById); 
router.put('/transacciones/:id', transactionController.updateTransaction);
router.delete('/transacciones/:id', transactionController.deleteTransaction);

module.exports = router;
