const express = require('express');
const ServiceController = require('../controllers/serviceController');

const router = express.Router();

// Rutas para servicios
router.post('/', ServiceController.createService); // Crear un nuevo servicio
router.get('/:id', ServiceController.getServiceById); // Obtener servicio por ID
router.get('/:businessId/services', ServiceController.getAllServicesByBusinessId); // Obtener todos los servicios por ID de negocio
router.get('/', ServiceController.getAllServices); // Obtener todos los servicios
router.put('/:id', ServiceController.updateService); // Actualizar servicio por ID
router.delete('/:id', ServiceController.deleteService); // Eliminar servicio por ID

module.exports = router;
