const db = require("../database");
const crearServicio = async ({ negocio_id, nombre, duracion, precio }) => {
  const result = await db.query(
    "INSERT INTO servicio (negocio_id, nombre, duracion, precio) VALUES ($1, $2, $3, $4) RETURNING *",
    [negocio_id, nombre, duracion, precio]
  );
  return result.rows[0];
};

const obtenerServicios = async () => {
  const result = await db.query("SELECT * FROM servicio ORDER BY fecha_creacion DESC");
  return result.rows;
};

const obtenerServiciosPorNegocio = async (negocio_id) => {
  const result = await db.query("SELECT * FROM servicio WHERE negocio_id = $1 ORDER BY fecha_creacion DESC", [negocio_id]);
  return result.rows;
};

const obtenerServicioPorId = async (id) => {
  const result = await db.query("SELECT * FROM servicio WHERE id = $1", [id]);
  return result.rows[0] || null;
};

const actualizarServicio = async (id, { nombre, duracion, precio }) => {
  const result = await db.query(
    "UPDATE servicio SET nombre = $1, duracion = $2, precio = $3 WHERE id = $4 RETURNING *",
    [nombre, duracion, precio, id]
  );
  return result.rows[0] || null;
};

const eliminarServicio = async (id) => {
  const result = await db.query("DELETE FROM servicio WHERE id = $1 RETURNING id", [id]);
  return result.rowCount > 0;
};

module.exports = { crearServicio, obtenerServicios, obtenerServiciosPorNegocio, obtenerServicioPorId, actualizarServicio, eliminarServicio };
