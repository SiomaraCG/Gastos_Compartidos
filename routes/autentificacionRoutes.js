const express = require('express');
const router = express.Router();
const autentificacionController = require('../controllers/autentificacionControllers');

router.post('/autentificaciones', autentificacionController.createAutentificacion);
router.post('/autentificaciones/all', autentificacionController.getAllAutentificaciones); 
router.post('/autentificaciones/:id', autentificacionController.getAutentificacionById); 
router.put('/autentificaciones/:id', autentificacionController.updateAutentificacion);
router.delete('/autentificaciones/:id', autentificacionController.deleteAutentificacion);

module.exports = router;
