const negocioService = require("../services/negocioService");

const crearNegocio = async (req, res) => {
  try {
    const negocio = await negocioService.crearNegocio(req.body);
    res.status(201).json(negocio);
  } catch (error) {
    res.status(500).json({ message: "Error creando negocio", error });
  }
};

const obtenerNegocios = async (req, res) => {
  try {
    const negocios = await negocioService.obtenerNegocios();
    res.json(negocios);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo negocios", error });
  }
};

const obtenerNegocioPorId = async (req, res) => {
  try {
    const negocio = await negocioService.obtenerNegocioPorId(req.params.id);
    if (!negocio) return res.status(404).json({ message: "Negocio no encontrado" });
    res.json(negocio);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo negocio", error });
  }
};

const actualizarNegocio = async (req, res) => {
  try {
    const negocioActualizado = await negocioService.actualizarNegocio(req.params.id, req.body);
    if (!negocioActualizado) return res.status(404).json({ message: "Negocio no encontrado" });
    res.json(negocioActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando negocio", error });
  }
};

const eliminarNegocio = async (req, res) => {
  try {
    const eliminado = await negocioService.eliminarNegocio(req.params.id);
    if (!eliminado) return res.status(404).json({ message: "Negocio no encontrado" });
    res.json({ message: "Negocio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando negocio", error });
  }
};

module.exports = { crearNegocio, obtenerNegocios, obtenerNegocioPorId, actualizarNegocio, eliminarNegocio };
