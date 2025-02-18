const citaService = require("../services/citasService");

const crearCita = async (req, res) => {
  try {
    const cita = await citaService.crearCita(req.body);
    res.status(201).json(cita);
  } catch (error) {
    res.status(500).json({ message: "Error creando cita", error });
  }
};

const obtenerCitas = async (req, res) => {
  try {
    const citas = await citaService.obtenerCitas();
    res.json(citas);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo citas", error });
  }
};

const obtenerCitasPorNegocio = async (req, res) => {
  try {
    const citas = await citaService.obtenerCitasPorNegocio(req.params.negocio_id);
    res.json(citas);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo citas por negocio", error });
  }
};

const obtenerCitaPorId = async (req, res) => {
  try {
    const cita = await citaService.obtenerCitaPorId(req.params.id);
    if (!cita) return res.status(404).json({ message: "Cita no encontrada" });
    res.json(cita);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo cita", error });
  }
};

const actualizarEstadoCita = async (req, res) => {
  try {
    const cita = await citaService.actualizarEstadoCita(req.params.id, req.body.estado);
    if (!cita) return res.status(404).json({ message: "Cita no encontrada" });
    res.json(cita);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando cita", error });
  }
};

const eliminarCita = async (req, res) => {
  try {
    const eliminada = await citaService.eliminarCita(req.params.id);
    if (!eliminada) return res.status(404).json({ message: "Cita no encontrada" });
    res.json({ message: "Cita eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando cita", error });
  }
};

module.exports = { crearCita, obtenerCitas, obtenerCitasPorNegocio, obtenerCitaPorId, actualizarEstadoCita, eliminarCita };
