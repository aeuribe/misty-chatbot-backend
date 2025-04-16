// src/appointmentController.js

const AppointmentService = require('../services/appointmentService');

const AppointmentController = {
    // Crear una nueva cita
    async createAppointment(req, res) {
        console.log("apointment recibido", req.body);
        const { businessId, clientId, serviceId, date, startTime, endTime, status } = req.body;
        try {
            const newAppointment = await AppointmentService.createAppointment(businessId, clientId, serviceId, date, startTime, endTime, status);
            res.status(201).json(newAppointment); // Devuelve la nueva cita creada
        } catch (error) {
            res.status(400).json({ error: error.message }); // Manejo de errores
        }
    },

    // Obtener una cita por ID
    async getAppointmentById(req, res) {
        const { id } = req.params;
        try {
            const appointment = await AppointmentService.getAppointmentById(id);
            if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
            res.status(200).json(appointment); // Devuelve la cita encontrada
        } catch (error) {
            res.status(500).json({ error: error.message }); // Manejo de errores
        }
    },

    async getAllAppointmentDataByNumber(req, res) {
        const { number } = req.params;
        try{
            const appointment = await AppointmentService.getAllAppointmentDataByNumber(number);
            if (!appointment) return res.status(404).json({ error: 'Appointment not found' });
            res.status(200).json(appointment); // Devuelve la cita encontrada
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Obtener todas las citas
    async getAllAppointments(req, res) {
        try {
            const appointments = await AppointmentService.getAllAppointments();
            res.status(200).json(appointments); // Devuelve la lista de citas
        } catch (error) {
            res.status(500).json({ error: error.message }); // Manejo de errores
        }
    },

    // Obtener todas las citas por ID de cliente
    async getAllAppointmentsByClientId(req, res) {
        const { clientId } = req.params;
        try {
            const appointments = await AppointmentService.getAllAppointmentsByClientId(clientId);
            res.status(200).json(appointments); // Devuelve la lista de citas del cliente
        } catch (error) {
            res.status(500).json({ error: error.message }); // Manejo de errores
        }
    },
    async getAllAppointmentsByEmail(req, res) {
        const { email } = req.params;
        try {
            console.log("desde el backend he recibido el email:", email);
            const appointments = await AppointmentService.getAllAppointmentsByEmail(email);
            res.status(200).json(appointments); // Devuelve la lista de citas del cliente
        } catch (error) {
            res.status(500).json({ error: error.message }); // Manejo de errores
        }
    },
    // Obtener todas las citas por ID de negocio
    async getAllAppointmentsByBusinessId(req, res) {
        const { businessId } = req.params;
        try {
            const appointments = await AppointmentService.getAllAppointmentsByBusinessId(businessId);
            res.status(200).json(appointments); // Devuelve la lista de citas del negocio
        } catch (error) {
            res.status(500).json({ error: error.message }); // Manejo de errores
        }
    },

    // Actualizar una cita existente
    async updateAppointment(req, res) {
        const { id } = req.params;
        const { businessId, clientId, serviceId, date, startTime, endTime, status } = req.body;
        try {
            const updatedAppointment = await AppointmentService.updateAppointment(id, businessId, clientId, serviceId, date, startTime, endTime, status);
            if (!updatedAppointment) return res.status(404).json({ error: 'Appointment not found' });
            res.status(200).json(updatedAppointment); // Devuelve la cita actualizada
        } catch (error) {
            res.status(400).json({ error: error.message }); // Manejo de errores
        }
    },

    // Eliminar una cita por ID
    async deleteAppointment(req, res) {
        const { id } = req.params;
        try {
            const deletedAppointment = await AppointmentService.deleteAppointment(id);
            if (!deletedAppointment) return res.status(404).json({ error: 'Appointment not found' });
            res.status(204).send(); // Respuesta vacía para eliminación exitosa
        } catch (error) {
            res.status(500).json({ error: error.message }); // Manejo de errores
        }
    }
};

module.exports = AppointmentController;
