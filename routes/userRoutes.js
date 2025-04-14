// src/userRoutes.js

const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

// Rutas para usuarios
router.post('/', UserController.createUser); // Crear un nuevo usuario
router.get('/:id', UserController.getUserById); // Obtener usuario por ID
router.get('/', UserController.getAllUsers); // Obtener todos los usuarios
router.put('/:id', UserController.updateUser); // Actualizar usuario por ID
router.delete('/:id', UserController.deleteUser); // Eliminar usuario por ID

module.exports = router;
