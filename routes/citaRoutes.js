const express = require("express");
const router = express.Router();
const citaController = require("../controllers/citaController");

router.post("/", citaController.crearCita);                 // Crear una nueva cita
router.get("/", citaController.obtenerCitas);               // Obtener todas las citas
router.get("/:negocio_id", citaController.obtenerCitasPorNegocio); // Obtener citas por negocio
router.get("/detalle/:id", citaController.obtenerCitaPorId); // Obtener una cita específica por ID
router.put("/:id", citaController.actualizarEstadoCita);    // Actualizar estado de la cita
router.delete("/:id", citaController.eliminarCita);         // Eliminar una cita

module.exports = router;
