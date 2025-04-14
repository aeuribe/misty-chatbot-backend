const pool = require("../database");

const UnavailableSlotService = {
    async createUnavailableSlot(businessId, date, startTime, endTime, reason) {
        const result = await pool.query(
            `INSERT INTO unavailable_slots 
            (business_id, date, start_time, end_time, reason) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`,
            [businessId, date, startTime, endTime, reason]
        );
        return result.rows[0];
    },

    async getUnavailableSlotById(slotId) {
        const result = await pool.query('SELECT * FROM unavailable_slots WHERE unavailable_slots_id = $1', [slotId]);
        return result.rows[0];
    },

    async getAllUnavailableSlots() {
        const result = await pool.query('SELECT * FROM unavailable_slots');
        return result.rows;
    },

    async updateUnavailableSlot(slotId, businessId, date, startTime, endTime, reason) {
        const result = await pool.query(
            `UPDATE unavailable_slots SET 
            business_id = $1, 
            date = $2, 
            start_time = $3, 
            end_time = $4, 
            reason = $5 
            WHERE unavailable_slots_id = $6 
            RETURNING *`,
            [businessId, date, startTime, endTime, reason, slotId]
        );
        return result.rows[0];
    },

    async deleteUnavailableSlot(slotId) {
        const result = await pool.query('DELETE FROM unavailable_slots WHERE unavailable_slots_id = $1 RETURNING *', [slotId]);
        return result.rows[0];
    }
};

module.exports = UnavailableSlotService;
