const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/usuarioControllers');

router.post('/usuarios', expenseController.createExpense);
router.post('/usuarios/all', expenseController.getAllExpenses); // Cambiado de GET a POST
router.post('/usuarios/:id', expenseController.getExpenseById); // Cambiado de GET a POST
router.put('/usuarios/:id', expenseController.updateExpense);
router.delete('/usuarios/:id', expenseController.deleteExpense);

module.exports = router;