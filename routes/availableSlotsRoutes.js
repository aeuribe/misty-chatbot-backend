const express = require('express');
const router = express.Router();
const availableSlotsController = require('../controllers/availableSlotsController');

// Definir la ruta para obtener horarios disponibles
router.get('/', availableSlotsController.getAvailableSlots);

module.exports = router;
