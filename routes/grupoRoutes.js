const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/grupoControllers');

router.post('/grupos', expenseController.createExpense);
router.post('/grupos/all', expenseController.getAllExpenses); // Cambiado de GET a POST
router.post('/grupos/:id', expenseController.getExpenseById); // Cambiado de GET a POST
router.put('/grupos/:id', expenseController.updateExpense);
router.delete('/grupos/:id', expenseController.deleteExpense);

module.exports = router;