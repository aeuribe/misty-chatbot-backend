const db = require("../database");

const crearCita = async ({ negocio_id, cliente_nombre, telefono, servicio_id, fecha_hora, estado }) => {
  const result = await db.query(
    "INSERT INTO cita (negocio_id, cliente_nombre, telefono, servicio_id, fecha_hora, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [negocio_id, cliente_nombre, telefono, servicio_id, fecha_hora, estado || 'pendiente']
  );
  return result.rows[0];
};

const obtenerCitas = async () => {
  const result = await db.query("SELECT * FROM cita ORDER BY fecha_hora DESC");
  return result.rows;
};

const obtenerCitasPorNegocio = async (negocio_id) => {
  const result = await db.query("SELECT * FROM cita WHERE negocio_id = $1 ORDER BY fecha_hora DESC", [negocio_id]);
  return result.rows;
};

const obtenerCitaPorId = async (id) => {
  const result = await db.query("SELECT * FROM cita WHERE id = $1", [id]);
  return result.rows[0] || null;
};

const actualizarEstadoCita = async (id, estado) => {
  const result = await db.query(
    "UPDATE cita SET estado = $1 WHERE id = $2 RETURNING *",
    [estado, id]
  );
  return result.rows[0] || null;
};

const eliminarCita = async (id) => {
  const result = await db.query("DELETE FROM cita WHERE id = $1 RETURNING id", [id]);
  return result.rowCount > 0;
};

module.exports = { crearCita, obtenerCitas, obtenerCitasPorNegocio, obtenerCitaPorId, actualizarEstadoCita, eliminarCita };
