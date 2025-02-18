const db = require("../database");

const createTables = async () => {
  try {
    await db.query(`
      -- Tabla de usuarios (Cada negocio tiene un usuario para autenticarse)
      CREATE TABLE IF NOT EXISTS usuario (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          contraseña TEXT NOT NULL, -- Se almacenará hasheada
          fecha_creacion TIMESTAMP DEFAULT NOW()
      );

      -- Tabla de negocios (Cada negocio tiene un bot asignado)
      CREATE TABLE IF NOT EXISTS negocio (
        id SERIAL PRIMARY KEY,
        usuario_id INT UNIQUE REFERENCES usuario(id) ON DELETE CASCADE,
        nombre VARCHAR(255) NOT NULL,
        telefono VARCHAR(20) UNIQUE NOT NULL,
        tipo VARCHAR(10) NOT NULL DEFAULT 'persona',
        fecha_creacion TIMESTAMP DEFAULT NOW(),
        CONSTRAINT tipo_check CHECK (tipo IN ('persona', 'empresa'))
    );
    

      -- Tabla de servicios (Cada negocio ofrece varios servicios)
      CREATE TABLE IF NOT EXISTS servicio (
          id SERIAL PRIMARY KEY,
          negocio_id INT REFERENCES negocio(id) ON DELETE CASCADE,
          nombre VARCHAR(255) NOT NULL,
          duracion INT NOT NULL,
          precio DECIMAL(10,2),
          fecha_creacion TIMESTAMP DEFAULT NOW()
      );

      -- Tabla de mensajes (Cada negocio personaliza sus mensajes)
      CREATE TABLE IF NOT EXISTS mensaje (
          id SERIAL PRIMARY KEY,
          negocio_id INT REFERENCES negocio(id) ON DELETE CASCADE,
          tipo VARCHAR(50) NOT NULL, -- Ej: 'bienvenida', 'recordatorio', 'cancelacion'
          contenido TEXT NOT NULL,
          fecha_creacion TIMESTAMP DEFAULT NOW()
      );

      -- Tabla de citas (Cada cliente agenda una cita en un negocio)
      CREATE TABLE IF NOT EXISTS cita (
          id SERIAL PRIMARY KEY,
          negocio_id INT REFERENCES negocio(id) ON DELETE CASCADE,
          cliente_nombre VARCHAR(255) NOT NULL,
          telefono VARCHAR(20) NOT NULL,
          servicio_id INT REFERENCES servicio(id) ON DELETE CASCADE,
          fecha_hora TIMESTAMP NOT NULL,
          estado VARCHAR(50) DEFAULT 'pendiente',
          fecha_creacion TIMESTAMP DEFAULT NOW()  

      );
    `);
    console.log("✔ Tablas creadas correctamente en PostgreSQL");
  } catch (error) {
    console.error("❌ Error creando tablas:", error);
  }
  // } finally {
  //   db.end();
  // }
};

createTables();
