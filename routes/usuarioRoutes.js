const express = require('express');
const router = express.Router();
const userController = require('../controllers/usuarioControllers');

router.post('/usuarios', userController.createUser);
router.post('/usuarios/all', userController.getAllUsers); 
router.post('/usuarios/:id', userController.getUserById); 
router.put('/usuarios/:id', userController.updateUser);
router.delete('/usuarios/:id', userController.deleteUser);

module.exports = router;
