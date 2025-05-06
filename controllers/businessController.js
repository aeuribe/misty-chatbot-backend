const BusinessService = require('../services/businessService');

const BusinessController = {
    async createBusiness(req, res) {
        const { userId, businessName, number, timezone, address } = req.body;
        try {
            const newBusiness = await BusinessService.createBusiness(userId, businessName, number, timezone, address);
            res.status(201).json(newBusiness);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getBusinessById(req, res) {
        const { id } = req.params;
        try {
            const business = await BusinessService.getBusinessById(id);
            if (!business) return res.status(404).json({ error: 'Business not found' });
            res.status(200).json(business);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getBusinessByEmail(req, res) {
        console.log("he recibido el mensaje:", req);
        const { email } = req.params;
        try {
            const business = await BusinessService.getBusinessByEmail(email);
            if (!business) return res.status(404).json({ error: 'Business not found' });
            res.status(200).json(business);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllBusinesses(req, res) {
        try {
            const businesses = await BusinessService.getAllBusinesses();
            res.status(200).json(businesses);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getBusinessByNumber(req, res) {
        const { number } = req.params;
        try {
            const business = await BusinessService.getBusinessByNumber(number);
            if (!business) {
                return res.status(404).json({ error: "Business not found" });
            }
            res.json(business);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },    

    async updateBusiness(req, res) {
        const { id } = req.params;
        const { userId, businessName, number, timezone, address } = req.body;
        try {
            const updatedBusiness = await BusinessService.updateBusiness(id, userId, businessName, number, timezone, address);
            if (!updatedBusiness) return res.status(404).json({ error: 'Business not found' });
            res.status(200).json(updatedBusiness);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteBusiness(req, res) {
        const { id } = req.params;
        try {
            const deletedBusiness = await BusinessService.deleteBusiness(id);
            if (!deletedBusiness) return res.status(404).json({ error: 'Business not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = BusinessController;
