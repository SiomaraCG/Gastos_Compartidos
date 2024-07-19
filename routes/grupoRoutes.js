const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoControllers');

router.post('/grupos', grupoController.createGroup);
router.post('/grupos/all', grupoController.getAllGroups); // Cambiado de GET a POST
router.post('/grupos/:id', grupoController.getGroupById); // Cambiado de GET a POST
router.put('/grupos/:id', grupoController.updateGroup);
router.delete('/grupos/:id', grupoController.deleteGroup);

module.exports = router;
