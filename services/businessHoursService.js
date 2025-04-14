const pool = require("../database");

const BusinessHoursService = {
    async createBusinessHours(businessId, dayOfWeek, openTime, closeTime, breakStart, breakEnd) {
        const result = await pool.query(
            `INSERT INTO business_hours 
            (business_id, day_of_week, open_time, close_time, break_start, break_end) 
            VALUES ($1, $2, $3, $4, $5, $6) 
            RETURNING *`,
            [businessId, dayOfWeek, openTime, closeTime, breakStart, breakEnd]
        );
        return result.rows[0];
    },

    async getBusinessHoursById(hoursId) {
        const result = await pool.query('SELECT * FROM business_hours WHERE business_hours_id = $1', [hoursId]);
        return result.rows[0];
    },

    async getAllBusinessHours() {
        const result = await pool.query('SELECT * FROM business_hours');
        return result.rows;
    },

    async updateBusinessHours(hoursId, businessId, dayOfWeek, openTime, closeTime, breakStart, breakEnd) {
        const result = await pool.query(
            `UPDATE business_hours SET 
            business_id = $1, 
            day_of_week = $2, 
            open_time = $3, 
            close_time = $4, 
            break_start = $5, 
            break_end = $6 
            WHERE business_hours_id = $7 
            RETURNING *`,
            [businessId, dayOfWeek, openTime, closeTime, breakStart, breakEnd, hoursId]
        );
        return result.rows[0];
    },

    async deleteBusinessHours(hoursId) {
        const result = await pool.query('DELETE FROM business_hours WHERE business_hours_id = $1 RETURNING *', [hoursId]);
        return result.rows[0];
    }
};

module.exports = BusinessHoursService;
