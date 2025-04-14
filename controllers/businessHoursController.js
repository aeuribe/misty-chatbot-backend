const BusinessHoursService = require('../services/businessHoursService');

const BusinessHoursController = {
    // Crear nuevos horarios comerciales
    async createBusinessHours(req, res) {
        const { businessId, dayOfWeek, openTime, closeTime, breakStart, breakEnd } = req.body;
        try {
            const newBusinessHours = await BusinessHoursService.createBusinessHours(businessId, dayOfWeek, openTime, closeTime, breakStart, breakEnd);
            res.status(201).json(newBusinessHours); // Devuelve el nuevo horario creado
        } catch (error) {
            res.status(400).json({ error: error.message }); // Manejo de errores
        }
    },

    // Obtener horarios comerciales por ID
    async getBusinessHoursById(req, res) {
        const { id } = req.params;
        try {
            const businessHours = await BusinessHoursService.getBusinessHoursById(id);
            if (!businessHours) return res.status(404).json({ error: 'Business hours not found' });
            res.status(200).json(businessHours); // Devuelve los horarios encontrados
        } catch (error) {
            res.status(500).json({ error: error.message }); // Manejo de errores
        }
    },

    // Obtener todos los horarios comerciales
    async getAllBusinessHours(req, res) {
        try {
            const businessHoursList = await BusinessHoursService.getAllBusinessHours();
            res.status(200).json(businessHoursList); // Devuelve la lista de horarios
        } catch (error) {
            res.status(500).json({ error: error.message }); // Manejo de errores
        }
    },

    // Actualizar horarios comerciales existentes
    async updateBusinessHours(req, res) {
        const { id } = req.params;
        const { businessId, dayOfWeek, openTime, closeTime, breakStart, breakEnd } = req.body;
        try {
            const updatedBusinessHours = await BusinessHoursService.updateBusinessHours(id, businessId, dayOfWeek, openTime, closeTime, breakStart, breakEnd);
            if (!updatedBusinessHours) return res.status(404).json({ error: 'Business hours not found' });
            res.status(200).json(updatedBusinessHours); // Devuelve los horarios actualizados
        } catch (error) {
            res.status(400).json({ error: error.message }); // Manejo de errores
        }
    },

    // Eliminar horarios comerciales por ID
    async deleteBusinessHours(req, res) {
        const { id } = req.params;
        try {
            const deletedBusinessHours = await BusinessHoursService.deleteBusinessHours(id);
            if (!deletedBusinessHours) return res.status(404).json({ error: 'Business hours not found' });
            res.status(204).send(); // Respuesta vacía para eliminación exitosa
        } catch (error) {
            res.status(500).json({ error: error.message }); // Manejo de errores
        }
    }
};

module.exports = BusinessHoursController;
