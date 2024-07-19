const express = require('express');
const router = express.Router();
const balanceController = require('../controllers/balanceControllers');


router.post('/balances', balanceController.createBalance);
router.post('/balances/all', balanceController.getAllBalances); 
router.post('/balances/:id', balanceController.getBalanceById); 
router.put('/balances/:id', balanceController.updateBalance);
router.delete('/balances/:id', balanceController.deleteBalance);

module.exports = router;
