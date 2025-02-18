const db = require("../database");

const crearMensaje = async ({ negocio_id, tipo, contenido }) => {
  const result = await db.query(
    "INSERT INTO mensaje (negocio_id, tipo, contenido) VALUES ($1, $2, $3) RETURNING *",
    [negocio_id, tipo, contenido]
  );
  return result.rows[0];
};

const obtenerMensajesPorNegocio = async (negocio_id) => {
  const result = await db.query("SELECT * FROM mensaje WHERE negocio_id = $1", [negocio_id]);
  return result.rows;
};

const obtenerMensajePorId = async (id) => {
  const result = await db.query("SELECT * FROM mensaje WHERE id = $1", [id]);
  return result.rows[0] || null;
};

const actualizarMensaje = async (id, { tipo, contenido }) => {
  const result = await db.query(
    "UPDATE mensaje SET tipo = $1, contenido = $2 WHERE id = $3 RETURNING *",
    [tipo, contenido, id]
  );
  return result.rows[0] || null;
};

const eliminarMensaje = async (id) => {
  const result = await db.query("DELETE FROM mensaje WHERE id = $1 RETURNING id", [id]);
  return result.rowCount > 0;
};

module.exports = { crearMensaje, obtenerMensajesPorNegocio, obtenerMensajePorId, actualizarMensaje, eliminarMensaje };
