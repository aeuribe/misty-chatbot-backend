const express = require('express');
const BusinessHoursController = require('../controllers/businessHoursController');

const router = express.Router();

// Rutas para horarios comerciales
router.post('/', BusinessHoursController.createBusinessHours); // Crear nuevos horarios comerciales
router.get('/:id', BusinessHoursController.getBusinessHoursById); // Obtener horarios comerciales por ID
router.get('/', BusinessHoursController.getAllBusinessHours); // Obtener todos los horarios comerciales
router.put('/:id', BusinessHoursController.updateBusinessHours); // Actualizar horarios comerciales por ID
router.delete('/:id', BusinessHoursController.deleteBusinessHours); // Eliminar horarios comerciales por ID

module.exports = router;
