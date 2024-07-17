const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/gastoControllers');

router.post('/gastos', expenseController.createExpense);
router.post('/gastos/all', expenseController.getAllExpenses); // Cambiado de GET a POST
router.post('/gastos/:id', expenseController.getExpenseById); // Cambiado de GET a POST
router.put('/gastos/:id', expenseController.updateExpense);
router.delete('/gastos/:id', expenseController.deleteExpense);

module.exports = router;
