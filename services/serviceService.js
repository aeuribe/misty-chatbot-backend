const pool = require("../database");

const ServiceService = {
    async createService(businessId, serviceName, description, durationMin, price) {
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
        const result = await pool.query('SELECT * FROM service WHERE service_id = $1', [serviceId]);
        return result.rows[0];
    },

    async getAllServicesByBusinessId(businessId) {
        const result = await pool.query('SELECT * FROM service WHERE business_id = $1', [businessId]);
        return result.rows;
    },

    async getAllServices() {
        const result = await pool.query('SELECT * FROM service');
        return result.rows;
    },

    async updateService(serviceId, businessId, serviceName, description, durationMin, price) {
        const result = await pool.query(
            `UPDATE service SET 
            business_id = $1, 
            service_name = $2, 
            description = $3, 
            duration_min = $4, 
            price = $5 
            WHERE service_id = $6 
            RETURNING *`,
            [businessId, serviceName, description, durationMin, price, serviceId]
        );
        return result.rows[0];
    },

    async deleteService(serviceId) {
        const result = await pool.query('DELETE FROM service WHERE service_id = $1 RETURNING *', [serviceId]);
        return result.rows[0];
    }
};

module.exports = ServiceService;