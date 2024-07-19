const express = require('express');
const router = express.Router();
const grupoController = require('../controllers/grupoControllers');

router.post('/grupos', grupoController.createGroup);
router.post('/grupos/all', grupoController.getAllGroups);
router.post('/grupos/:id', grupoController.getGroupById); 
router.put('/grupos/:id', grupoController.updateGroup);
router.delete('/grupos/:id', grupoController.deleteGroup);

module.exports = router;
