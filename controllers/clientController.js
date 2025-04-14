const ClientService = require('../services/clientService');

const ClientController = {
    async createClient(req, res) {
        console.log("req_body: ", req.body);
        const { business_id, client_name, number, email } = req.body;
        try {
            const newClient = await ClientService.createClient(business_id, client_name, number, email);
            res.status(201).json(newClient);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getClientById(req, res) {
        const { id } = req.params;
        try {
            const client = await ClientService.getClientById(id);
            if (!client) return res.status(404).json({ error: 'Client not found' });
            res.status(200).json(client);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getClientByNumber(req, res) {
        const { number } = req.params;
        try {
            const client = await ClientService.getClientByNumber(number);
            if(!client) return res.status(404).json({ error: 'Client not found'});
            res.status(200).json(client);
        } catch (error) {
            res.status(500).json({error: error.message});
        }
    },

    async getAllClients(req, res) {
        try {
            const clients = await ClientService.getAllClients();
            res.status(200).json(clients);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateClient(req, res) {
        const { id } = req.params;
        const { businessId, clientName, number, email } = req.body;
        try {
            const updatedClient = await ClientService.updateClient(id, businessId, clientName, number, email);
            if (!updatedClient) return res.status(404).json({ error: 'Client not found' });
            res.status(200).json(updatedClient);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteClient(req, res) {
        const { id } = req.params;
        try {
            const deletedClient = await ClientService.deleteClient(id);
            if (!deletedClient) return res.status(404).json({ error: 'Client not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = ClientController;
