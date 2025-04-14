const availableSlotsService = require('../services/availableSlotsService');

async function getAvailableSlots(req, res) {
    try {
        const { businessId, date, slotDuration } = req.query;

        if (!businessId || !date) {
            return res.status(400).json({ message: "businessId y date son requeridos" });
        }

        const slots = await availableSlotsService.getAvailableSlots(businessId, date, slotDuration || 15);
        res.json({ availableSlots: slots });
    } catch (error) {
        console.error("Error fetching available slots:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
}

module.exports = { getAvailableSlots };
