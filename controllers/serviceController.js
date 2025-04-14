const ServiceService = require('../services/serviceService');

const ServiceController = {
    async createService(req, res) {
        const { businessId, serviceName, description, durationMin, price } = req.body;
        try {
            const newService = await ServiceService.createService(businessId, serviceName, description, durationMin, price);
            res.status(201).json(newService);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getServiceById(req, res) {
        const { id } = req.params;
        try {
            const service = await ServiceService.getServiceById(id);
            if (!service) return res.status(404).json({ error: 'Service not found' });
            res.status(200).json(service);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllServicesByBusinessId(req, res) {
        const { businessId } = req.params;
        try {
            const services = await ServiceService.getAllServicesByBusinessId(businessId);
            res.status(200).json(services);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllServices(req, res) {
        try {
            const services = await ServiceService.getAllServices();
            res.status(200).json(services);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateService(req, res) {
        const { id } = req.params;
        const { businessId, serviceName, description, durationMin, price } = req.body;
        try {
            const updatedService = await ServiceService.updateService(id, businessId, serviceName, description, durationMin, price);
            if (!updatedService) return res.status(404).json({ error: 'Service not found' });
            res.status(200).json(updatedService);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteService(req, res) {
        const { id } = req.params;
        try {
            const deletedService = await ServiceService.deleteService(id);
            if (!deletedService) return res.status(404).json({ error: 'Service not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = ServiceController;
