const express = require('express');
const UnavailableSlotController = require('../controllers/unavailableSlotsController');

const router = express.Router();

// Rutas para horarios no disponibles
router.post('/', UnavailableSlotController.createUnavailableSlot); // Crear un nuevo horario no disponible
router.get('/:id', UnavailableSlotController.getUnavailableSlotById); // Obtener horario no disponible por ID
router.get('/', UnavailableSlotController.getAllUnavailableSlots); // Obtener todos los horarios no disponibles
router.put('/:id', UnavailableSlotController.updateUnavailableSlot); // Actualizar horario no disponible por ID
router.delete('/:id', UnavailableSlotController.deleteUnavailableSlot); // Eliminar horario no disponible por ID

module.exports = router;
