const usuarioService = require("../services/usuarioService");

const crearUsuario = async (req, res) => {
  const { email } = req.body;
  try {
    const usuario = await usuarioService.crearUsuario(email);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error creando usuario", error });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await usuarioService.obtenerUsuarios();
    res.json(usuarios);
  } catch (error) {
    console.error("❌ Error en obtenerUsuarios:", error); // Agrega esto para ver el error en la terminal
    res.status(500).json({ message: "Error obteniendo usuarios", error: error.message });
  }
};


const obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await usuarioService.obtenerUsuarioPorId(req.params.id);
    if (!usuario) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo usuario", error });
  }
};

const actualizarUsuario = async (req, res) => {
  try {
    const usuarioActualizado = await usuarioService.actualizarUsuario(req.params.id, req.body);
    if (!usuarioActualizado) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ message: "Error actualizando usuario", error });
  }
};

const eliminarUsuario = async (req, res) => {
  try {
    const eliminado = await usuarioService.eliminarUsuario(req.params.id);
    if (!eliminado) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error eliminando usuario", error });
  }
};

module.exports = { crearUsuario, obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario };
