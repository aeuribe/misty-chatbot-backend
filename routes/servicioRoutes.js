const express = require("express");
const router = express.Router();
const servicioController = require("../controllers/servicioController");

router.post("/", servicioController.crearServicio);                 // Crear un servicio
router.get("/", servicioController.obtenerServicios);               // Obtener todos los servicios
router.get("/:negocio_id", servicioController.obtenerServiciosPorNegocio); // Obtener servicios por negocio
router.get("/detalle/:id", servicioController.obtenerServicioPorId); // Obtener un servicio específico
router.put("/:id", servicioController.actualizarServicio);          // Actualizar un servicio
router.delete("/:id", servicioController.eliminarServicio);         // Eliminar un servicio

module.exports = router;
