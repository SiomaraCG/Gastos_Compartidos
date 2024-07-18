const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceControllers');

router.post('/balances', balanceController.createBalance);
router.post('/balances/all', balanceController.getAllBalances); // Cambiado de GET a POST
router.post('/balances/:id', balanceController.getBalanceById); // Cambiado de GET a POST
router.put('/balances/:id', balanceController.updateBalance);
router.delete('/balances/:id', balanceController.deleteBalance);

module.exports = router;
