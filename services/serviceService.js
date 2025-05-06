const pool = require("../database");

const ServiceService = {
  async createService(
    businessId,
    serviceName,
    description,
    durationMin,
    price
  ) {
    const result = await pool.query(
      `INSERT INTO service 
            (business_id, service_name, description, duration_min, price) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`,
      [businessId, serviceName, description, durationMin, price]
    );
    return result.rows[0];
  },

  async getServiceById(serviceId) {
    const result = await pool.query(
      "SELECT * FROM service WHERE service_id = $1",
      [serviceId]
    );
    return result.rows[0];
  },

  async getAllServicesByBusinessId(businessId) {
    const result = await pool.query(
      "SELECT * FROM service WHERE business_id = $1",
      [businessId]
    );
    return result.rows;
  },

  async getAllServicesByBusinessEmail(email) {
    console.log("en servicio he recibido esto:", email);
    const result = await pool.query(
      `SELECT service.*
           FROM service
           JOIN business ON business.business_id = service.business_id
           WHERE business.email = $1`,
      [email]
    );
    console.log("el resultado de la consulta recibida es este:", result.rows);
    return result.rows;
  },

  async getAllServices() {
    const result = await pool.query("SELECT * FROM service");
    return result.rows;
  },

  async updateService(serviceId, fieldsToUpdate) {
    // Prepara arrays para SET y valores
    const setParts = [];
    const values = [];
    let idx = 1;

    // Lista blanca de campos permitidos
    const allowedFields = [
      "service_name",
      "description",
      "duration_min",
      "price",
    ];

    for (const key of allowedFields) {
      if (fieldsToUpdate[key] !== undefined) {
        setParts.push(`${key} = $${idx}`);
        values.push(fieldsToUpdate[key]);
        idx++;
      }
    }

    if (setParts.length === 0) {
      throw new Error("No valid fields to update");
    }

    // Agrega el serviceId para el WHERE
    values.push(serviceId);

    const query = `
          UPDATE service
          SET ${setParts.join(", ")}
          WHERE service_id = $${idx}
          RETURNING *
        `;

    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async deleteService(serviceId) {
    const result = await pool.query(
      "DELETE FROM service WHERE service_id = $1 RETURNING *",
      [serviceId]
    );
    return result.rows[0];
  },
};

module.exports = ServiceService;
