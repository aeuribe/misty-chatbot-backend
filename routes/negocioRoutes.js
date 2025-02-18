const express = require("express");
const router = express.Router();
const negocioController = require("../controllers/negocioController");

router.post("/", negocioController.crearNegocio);         // Crear un negocio
router.get("/", negocioController.obtenerNegocios);       // Obtener todos los negocios
router.get("/:id", negocioController.obtenerNegocioPorId); // Obtener un negocio por ID
router.put("/:id", negocioController.actualizarNegocio);  // Actualizar un negocio
router.delete("/:id", negocioController.eliminarNegocio); // Eliminar un negocio

module.exports = router;
