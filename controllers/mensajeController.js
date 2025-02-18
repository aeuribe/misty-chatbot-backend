const mensajeService = require("../services/mensajeService");

const crearMensaje = async (req, res) => {
  try {
    const mensaje = await mensajeService.crearMensaje(req.body);
    res.status(201).json(mensaje);
  } catch (error) {
    res.status(500).json({ message: "Error creando mensaje", error });
  }
};

const obtenerMensajesPorNegocio = async (req, res) => {
  try {
    const mensajes = await mensajeService.obtenerMensajesPorNegocio(req.params.negocio_id);
    res.json(mensajes);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo mensajes", error });
  }
};

const obtenerMensajePorId = async (req, res) => {
  try {
    const mensaje = await mensajeService.obtenerMensajePorId(req.params.id);
    if (!mensaje) return res.status(404).json({ message: "Mensaje no encontrado" });
    res.json(mensaje);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo mensaje", error });
  }
};

const actualizarMensaje = async (req, res) => {
  try {
    const mensajeActualizado = await mensajeService.actualizarMensaje(req.params.id, req.body);
    if (!mensajeActualizado) return res.status(404).json({ message: "Mensaje no encontrado" });
    res.json(mensajeActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando mensaje", error });
  }
};

const eliminarMensaje = async (req, res) => {
  try {
    const eliminado = await mensajeService.eliminarMensaje(req.params.id);
    if (!eliminado) return res.status(404).json({ message: "Mensaje no encontrado" });
    res.json({ message: "Mensaje eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando mensaje", error });
  }
};

module.exports = { crearMensaje, obtenerMensajesPorNegocio, obtenerMensajePorId, actualizarMensaje, eliminarMensaje };
