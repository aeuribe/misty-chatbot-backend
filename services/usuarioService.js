const db = require("../database");

const crearUsuario = async (email) => {
  const result = await db.query(
    "INSERT INTO usuario (email) VALUES ($1) RETURNING id, email, fecha_creacion",
    [email]
  );
  return result.rows[0];
};

const obtenerUsuarios = async () => {
  const result = await db.query("SELECT id, email, fecha_creacion FROM usuario");
  return result.rows;
};

const obtenerUsuarioPorId = async (id) => {
  const result = await db.query("SELECT id, email, fecha_creacion FROM usuario WHERE id = $1", [id]);
  return result.rows[0] || null;
};

const actualizarUsuario = async (id, { email }) => {
  const result = await db.query(
    "UPDATE usuario SET email = $1 WHERE id = $2 RETURNING id, email, fecha_creacion",
    [email, id]
  );
  return result.rows[0] || null;
};

const eliminarUsuario = async (id) => {
  const result = await db.query("DELETE FROM usuario WHERE id = $1 RETURNING id", [id]);
  return result.rowCount > 0;
};

module.exports = { crearUsuario, obtenerUsuarios, obtenerUsuarioPorId, actualizarUsuario, eliminarUsuario };
