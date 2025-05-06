const express = require('express');
const AppointmentController = require('../controllers/appointmentController');

const router = express.Router();

// Rutas para citas
router.post('/', AppointmentController.createAppointment); // Crear una nueva cita
router.get('/:id', AppointmentController.getAppointmentById); // Obtener cita por ID
router.get('/number/:number', AppointmentController.getAllAppointmentDataByNumber); // Obtener todos los datos del appointment por numero
router.get('/', AppointmentController.getAllAppointments); // Obtener todas las citas
router.get('/clients/:clientId/appointments', AppointmentController.getAllAppointmentsByClientId); // Obtener citas por ID de cliente
router.get('/businesses/:businessId/appointments', AppointmentController.getAllAppointmentsByBusinessId); // Obtener citas por ID de negocio
router.get('/email/:email', AppointmentController.getAllAppointmentsByEmail); //Obtener todos los datos relacionados a una cita por email
router.put('/:id', AppointmentController.updateAppointment); // Actualizar cita por ID
router.put('/:id/status', AppointmentController.updateStatus); // Actualizar estado de cita por ID
router.delete('/:id', AppointmentController.deleteAppointment); // Eliminar cita por ID

module.exports = router;
