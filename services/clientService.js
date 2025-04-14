const pool = require("../database");

const ClientService = {
    async createClient(businessId, clientName, number, email) {
        const result = await pool.query(
            'INSERT INTO client (business_id, client_name, number, email) VALUES ($1, $2, $3, $4) RETURNING *',
            [businessId, clientName, number, email]
        );
        return result.rows[0];
    },

    async getClientById(clientId) {
        const result = await pool.query('SELECT * FROM client WHERE client_id = $1', [clientId]);
        return result.rows[0];
    },

    async getClientByNumber(number) {
        const result = await pool.query('SELECT * FROM client WHERE number = $1',[number]);
        return result.rows[0];
    },
    
    async getAllClients() {
        const result = await pool.query('SELECT * FROM client');
        return result.rows;
    },

    async updateClient(clientId, businessId, clientName, number, email) {
        const result = await pool.query(
            'UPDATE client SET business_id = $1, client_name = $2, number = $3, email = $4 WHERE client_id = $5 RETURNING *',
            [businessId, clientName, number, email, clientId]
        );
        return result.rows[0];
    },

    async deleteClient(clientId) {
        const result = await pool.query('DELETE FROM client WHERE client_id = $1 RETURNING *', [clientId]);
        return result.rows[0];
    }
};

module.exports = ClientService;
