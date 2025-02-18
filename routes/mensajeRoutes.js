const express = require("express");
const router = express.Router();
const mensajeController = require("../controllers/mensajeController");

router.post("/", mensajeController.crearMensaje);                 // Crear un mensaje
router.get("/:negocio_id", mensajeController.obtenerMensajesPorNegocio); // Obtener mensajes por negocio
router.get("/detalle/:id", mensajeController.obtenerMensajePorId); // Obtener un mensaje específico
router.put("/:id", mensajeController.actualizarMensaje);          // Actualizar un mensaje
router.delete("/:id", mensajeController.eliminarMensaje);         // Eliminar un mensaje

module.exports = router;
