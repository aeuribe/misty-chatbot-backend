const pool = require("../database");

const BusinessService = {
    async createBusiness(userId, businessName, number, timezone, address) {
        const result = await pool.query(
            'INSERT INTO business (user_id, business_name, number, timezone, address) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [userId, businessName, number, timezone, address]
        );
        return result.rows[0];
    },

    async getBusinessById(businessId) {
        const result = await pool.query('SELECT * FROM business WHERE business_id = $1', [businessId]);
        return result.rows[0];
    },

    async getAllBusinesses() {
        const result = await pool.query('SELECT * FROM business');
        return result.rows;
    },

    async getBusinessByNumber(number) {
        const result = await pool.query('SELECT * FROM business WHERE business.number = $1',[number]);
        return result.rows[0];
    },

    async updateBusiness(businessId, userId, businessName, number, timezone, address) {
        const result = await pool.query(
            'UPDATE business SET user_id = $1, business_name = $2, number = $3, timezone = $4, address = $5 WHERE business_id = $6 RETURNING *',
            [userId, businessName, number, timezone, address, businessId]
        );
        return result.rows[0];
    },

    async deleteBusiness(businessId) {
        const result = await pool.query('DELETE FROM business WHERE business_id = $1 RETURNING *', [businessId]);
        return result.rows[0];
    }
};

module.exports = BusinessService;
