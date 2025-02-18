const db = require("../database");

const crearNegocio = async ({ usuario_id, nombre, telefono, tipo }) => {
  const result = await db.query(
    "INSERT INTO negocio (usuario_id, nombre, telefono, tipo) VALUES ($1, $2, $3, $4) RETURNING *",
    [usuario_id, nombre, telefono, tipo]
  );
  return result.rows[0];
};

const obtenerNegocios = async () => {
  const result = await db.query("SELECT * FROM negocio ORDER BY fecha_creacion DESC");
  return result.rows;
};

const obtenerNegocioPorId = async (id) => {
  const result = await db.query("SELECT * FROM negocio WHERE id = $1", [id]);
  return result.rows[0] || null;
};

const actualizarNegocio = async (id, { nombre, telefono, tipo }) => {
  const result = await db.query(
    "UPDATE negocio SET nombre = $1, telefono = $2, tipo = $3 WHERE id = $4 RETURNING *",
    [nombre, telefono, tipo, id]
  );
  return result.rows[0] || null;
};

const eliminarNegocio = async (id) => {
  const result = await db.query("DELETE FROM negocio WHERE id = $1 RETURNING id", [id]);
  return result.rowCount > 0;
};

module.exports = { crearNegocio, obtenerNegocios, obtenerNegocioPorId, actualizarNegocio, eliminarNegocio };
