const servicioService = require("../services/servicioService");

const crearServicio = async (req, res) => {
  try {
    const servicio = await servicioService.crearServicio(req.body);
    res.status(201).json(servicio);
  } catch (error) {
    res.status(500).json({ message: "Error creando servicio", error });
  }
};

const obtenerServicios = async (req, res) => {
  try {
    const servicios = await servicioService.obtenerServicios();
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo servicios", error });
  }
};

const obtenerServiciosPorNegocio = async (req, res) => {
  try {
    const servicios = await servicioService.obtenerServiciosPorNegocio(req.params.negocio_id);
    res.json(servicios);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo servicios por negocio", error });
  }
};

const obtenerServicioPorId = async (req, res) => {
  try {
    const servicio = await servicioService.obtenerServicioPorId(req.params.id);
    if (!servicio) return res.status(404).json({ message: "Servicio no encontrado" });
    res.json(servicio);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo servicio", error });
  }
};

const actualizarServicio = async (req, res) => {
  try {
    const servicioActualizado = await servicioService.actualizarServicio(req.params.id, req.body);
    if (!servicioActualizado) return res.status(404).json({ message: "Servicio no encontrado" });
    res.json(servicioActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando servicio", error });
  }
};

const eliminarServicio = async (req, res) => {
  try {
    const eliminado = await servicioService.eliminarServicio(req.params.id);
    if (!eliminado) return res.status(404).json({ message: "Servicio no encontrado" });
    res.json({ message: "Servicio eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando servicio", error });
  }
};

module.exports = { crearServicio, obtenerServicios, obtenerServiciosPorNegocio, obtenerServicioPorId, actualizarServicio, eliminarServicio };
