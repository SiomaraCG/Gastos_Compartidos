const express = require('express');
const router = express.Router();
const autentificacionController = require('../controllers/autentificacionControllers');

router.post('/autentificaciones', autentificacionController.createAutentificacion);

// Obtener todas las autentificaciones (usando POST en lugar de GET)
router.post('/autentificaciones/all', autentificacionController.getAllAutentificaciones);

// Obtener una autentificación específica por ID (usando POST en lugar de GET)
router.post('/autentificaciones/:id', autentificacionController.getAutentificacionById);

// Actualizar una autentificación existente
router.put('/autentificaciones/:id', autentificacionController.updateAutentificacion);

// Eliminar una autentificación por ID
router.delete('/autentificaciones/:id', autentificacionController.deleteAutentificacion);

module.exports = router;
 