const pool = require("../database");

const AppointmentService = {
  async createAppointment(
    businessId,
    clientId,
    serviceId,
    date,
    startTime,
    endTime,
    status
  ) {
    const result = await pool.query(
      `INSERT INTO appointment 
            (business_id, client_id, service_id, date, start_time, end_time, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING *`,
      [businessId, clientId, serviceId, date, startTime, endTime, status]
    );
    return result.rows[0];
  },

  async getAppointmentById(appointmentId) {
    const result = await pool.query(
      "SELECT * FROM appointment WHERE appointment_id = $1",
      [appointmentId]
    );
    return result.rows[0];
  },

  async getAllAppointmentDataByNumber(number) {
    const result = await pool.query(
      "SELECT * FROM appointment JOIN client ON (appointment.client_id = client.client_id) JOIN service ON (appointment.service_id = service.service_id) WHERE client.number = $1",
      [number]
    );
    return result.rows[0];
  },

  async getAllAppointments() {
    const result = await pool.query("SELECT * FROM appointment");
    return result.rows;
  },

  async getAllAppointmentsByNumber(number) {
    const result = await pool.quiery(
      "SELECT appointment_id, appointment.business_id, appointment.client_id, service_id, date, start_time, end_time, status FROM public.appointment JOIN client ON (appointment.client_id = client.client_id) WHERE client.number = $1",
      [number]
    );
    return result.rows;
  },

  async getAllAppointmentsByEmail(email) {
    const result = await pool.query(
      "SELECT a.appointment_id, a.date, a.start_time, a.end_time, a.status, c.client_id, c.client_name, c.number AS client_number, b.business_id, b.business_name, b.email AS business_email, b.number AS business_number, s.service_id, s.service_name, s.description AS service_description, s.duration_min, s.price FROM appointment a JOIN client c ON a.client_id = c.client_id JOIN business b ON a.business_id = b.business_id JOIN service s ON a.service_id = s.service_id WHERE b.email = $1",
      [email]
    );
    return result.rows;
  },

  async getAllAppointmentsByClientId(clientId) {
    const result = await pool.query(
      "SELECT * FROM appointment WHERE client_id = $1",
      [clientId]
    );
    return result.rows;
  },

  async getAllAppointmentsByBusinessId(businessId) {
    const result = await pool.query(
      "SELECT * FROM appointment WHERE business_id = $1",
      [businessId]
    );
    return result.rows;
  },

  async updateAppointment(
    appointmentId,
    businessId,
    clientId,
    serviceId,
    date,
    startTime,
    endTime,
    status
  ) {
    const result = await pool.query(
      `UPDATE appointment SET 
            business_id = $1, 
            client_id = $2, 
            service_id = $3, 
            date = $4, 
            start_time = $5, 
            end_time = $6, 
            status = $7 
            WHERE appointment_id = $8 
            RETURNING *`,
      [
        businessId,
        clientId,
        serviceId,
        date,
        startTime,
        endTime,
        status,
        appointmentId,
      ]
    );
    return result.rows[0];
  },

  async updateStatus(appointmentId, status) {
    const result = await pool.query(
      `UPDATE appointment SET 
              status = $1 
              WHERE appointment_id = $2 
              RETURNING *`,
      [status, appointmentId]
    );
    return result.rows[0];
  },

  async deleteAppointment(appointmentId) {
    const result = await pool.query(
      "DELETE FROM appointment WHERE appointment_id = $1 RETURNING *",
      [appointmentId]
    );
    return result.rows[0];
  },
};

module.exports = AppointmentService;
