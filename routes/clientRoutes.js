// src/clientRoutes.js

const express = require('express');
const ClientController = require('../controllers/clientController');

const router = express.Router();

// Rutas para clientes
router.post('/', ClientController.createClient); // Crear un nuevo cliente
router.get('/:id', ClientController.getClientById); // Obtener cliente por ID
router.get('/number/:number', ClientController.getClientByNumber); // Obtener cliente por numero
router.get('/', ClientController.getAllClients); // Obtener todos los clientes
router.put('/:id', ClientController.updateClient); // Actualizar cliente por ID
router.delete('/:id', ClientController.deleteClient); // Eliminar cliente por ID

module.exports = router;
