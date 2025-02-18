const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");

router.post("/", usuarioController.crearUsuario);        // Crear un usuario
router.get("/", usuarioController.obtenerUsuarios);      // Obtener todos los usuarios
router.get("/:id", usuarioController.obtenerUsuarioPorId); // Obtener un usuario por ID
router.put("/:id", usuarioController.actualizarUsuario); // Actualizar un usuario
router.delete("/:id", usuarioController.eliminarUsuario); // Eliminar un usuario

module.exports = router;
