const UnavailableSlotService = require('../services/unavailableSlotsService');

const UnavailableSlotController = {
    async createUnavailableSlot(req, res) {
        const { businessId, date, startTime, endTime, reason } = req.body;
        try {
            const newSlot = await UnavailableSlotService.createUnavailableSlot(businessId, date, startTime, endTime, reason);
            res.status(201).json(newSlot);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async getUnavailableSlotById(req, res) {
        const { id } = req.params;
        try {
            const slot = await UnavailableSlotService.getUnavailableSlotById(id);
            if (!slot) return res.status(404).json({ error: 'Unavailable slot not found' });
            res.status(200).json(slot);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getAllUnavailableSlots(req, res) {
        try {
            const slots = await UnavailableSlotService.getAllUnavailableSlots();
            res.status(200).json(slots);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateUnavailableSlot(req, res) {
        const { id } = req.params;
        const { businessId, date, startTime, endTime, reason } = req.body;
        try {
            const updatedSlot = await UnavailableSlotService.updateUnavailableSlot(id, businessId, date, startTime, endTime, reason);
            if (!updatedSlot) return res.status(404).json({ error: 'Unavailable slot not found' });
            res.status(200).json(updatedSlot);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

    async deleteUnavailableSlot(req, res) {
        const { id } = req.params;
        try {
            const deletedSlot = await UnavailableSlotService.deleteUnavailableSlot(id);
            if (!deletedSlot) return res.status(404).json({ error: 'Unavailable slot not found' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = UnavailableSlotController;
