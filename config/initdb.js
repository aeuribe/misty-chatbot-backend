const db = require("../database");

const createTables = async () => {
  try {
    // Establecer zona horaria UTC para la sesión actual
    await db.query("SET TIME ZONE 'UTC';");

    await db.query(`
      -- Tabla de negocios
      CREATE TABLE IF NOT EXISTS business (
          business_id SERIAL PRIMARY KEY,
          business_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          number VARCHAR(20) UNIQUE NOT NULL,
          timezone VARCHAR(50) NOT NULL,
          address VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Tabla de clientes
      CREATE TABLE IF NOT EXISTS client (
          client_id SERIAL PRIMARY KEY,
          business_id INT REFERENCES business(business_id) ON DELETE CASCADE,
          client_name VARCHAR(50) NOT NULL,
          number VARCHAR(20) UNIQUE NOT NULL,
          email VARCHAR(255) UNIQUE NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Tabla de servicios 
      CREATE TABLE IF NOT EXISTS service (
        service_id SERIAL PRIMARY KEY,
        business_id INT REFERENCES business(business_id) ON DELETE CASCADE,
        service_name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        duration_min INT NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    

      -- Tabla de horarios no disponibles 
      CREATE TABLE IF NOT EXISTS unavailable_slots (
          unavailable_slots_id SERIAL PRIMARY KEY,
          business_id INT REFERENCES business(business_id) ON DELETE CASCADE,
          date DATE,
          start_time TIME,
          end_time TIME,
          reason VARCHAR(255)
      );

      -- Tabla de horarios disponibles 
      CREATE TABLE IF NOT EXISTS business_hours (
          business_hours_id SERIAL PRIMARY KEY,
          business_id INT REFERENCES business(business_id) ON DELETE CASCADE,
          day_of_week VARCHAR(50) NOT NULL,
          open_time TIME NOT NULL,
          close_time TIME NOT NULL,
          break_start TIME NOT NULL,
          break_end TIME NOT NULL
      );
        
      -- Tabla de citas 
      CREATE TABLE IF NOT EXISTS appointment (
          appointment_id SERIAL PRIMARY KEY,
          business_id INT REFERENCES business(business_id) ON DELETE CASCADE,
          client_id INT REFERENCES client(client_id) ON DELETE CASCADE,
          service_id INT REFERENCES service(service_id) ON DELETE CASCADE,
          date DATE NOT NULL,
          start_time TIME NOT NULL,
          end_time TIME NOT NULL,
          status VARCHAR(50),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()  
      );
    `);

    console.log("✔ Tablas creadas correctamente en PostgreSQL");
  } catch (error) {
    console.error("❌ Error creando tablas:", error);
  }
};

createTables();
