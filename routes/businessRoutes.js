// src/businessRoutes.js

const express = require('express');
const BusinessController = require('../controllers/businessController');

const router = express.Router();

// Rutas para negocios
router.post('/', BusinessController.createBusiness); // Crear un nuevo negocio
router.get('/:id', BusinessController.getBusinessById); // Obtener negocio por ID
router.get('/email/:email', BusinessController.getBusinessByEmail); // Obtener negocio por Email
router.get('/', BusinessController.getAllBusinesses); // Obtener todos los negocios
router.get('/by-number/:number', BusinessController.getBusinessByNumber); // Obtener negocio por número
router.put('/:id', BusinessController.updateBusiness); // Actualizar negocio por ID
router.delete('/:id', BusinessController.deleteBusiness); // Eliminar negocio por ID


module.exports = router;
