const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/autentificacionControllers');

router.post('/autentificaciones', expenseController.createExpense);
router.post('/autentificaciones/all', expenseController.getAllExpenses); // Cambiado de GET a POST
router.post('/autentificaciones/:id', expenseController.getExpenseById); // Cambiado de GET a POST
router.put('/autentificaciones/:id', expenseController.updateExpense);
router.delete('/autentificaciones/:id', expenseController.deleteExpense);

module.exports = router;