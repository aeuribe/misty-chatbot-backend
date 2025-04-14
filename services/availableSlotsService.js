
const pool = require("../database"); // Configuración de BD
const { DateTime } = require("luxon");

async function getAvailableSlots(businessId, date, slotDuration = 15) {
// Asegurar que businessId es un número entero
const businessIdInt = parseInt(businessId, 10);
if (isNaN(businessIdInt)) throw new Error("Invalid business ID");

// 1️⃣ Obtener el horario del negocio
const businessHoursQuery = `
SELECT open_time, close_time, break_start, break_end
FROM business_hours
WHERE business_id = $1
AND day_of_week = TO_CHAR($2::DATE, 'FMDay')
`;

const { rows: businessHours } = await pool.query(businessHoursQuery, [
businessIdInt,
date,
]);
if (!businessHours.length) return []; // Si no hay horario, no hay disponibilidad

const { open_time, close_time, break_start, break_end } = businessHours[0];

// 2️⃣ Obtener citas reservadas para ese día
const appointmentsQuery = `
SELECT
appointment.start_time,
service.duration_min
FROM appointment
JOIN service ON appointment.service_id = service.service_id
WHERE appointment.date = $2 AND appointment.business_id = $1;
`;
const { rows: appointments } = await pool.query(appointmentsQuery, [
businessIdInt,
date,
]);

// 3️⃣ Generar la lista de horarios disponibles
return calculateAvailableSlots(
open_time,
close_time,
break_start,
break_end,
appointments,
slotDuration,
businessId
);
}

// 📌 Función auxiliar para calcular horarios disponibles
async function parseTime(timeStr, businessId) {
try {
// Obtener la hora y el timezone del negocio en una sola consulta
const result = await pool.query(
"SELECT timezone FROM business WHERE business_id = $1",
[businessId]
);

// Si el negocio no tiene timezone, usa UTC por defecto
const businessTimezone = result.rows[0]?.timezone || "UTC";

// Convertir el string de hora a un objeto DateTime con el timezone correcto
const [hours, minutes, seconds] = timeStr.split(":").map(Number);
return DateTime.fromObject(
{ hour: hours, minute: minutes, second: seconds || 0 },
{ zone: businessTimezone }
);
} catch (error) {
console.error("❌ Error obteniendo timezone:", error);
throw error;
}
}

async function calculateAvailableSlots(
openTime,
closeTime,
breakStart,
breakEnd,
appointments,
slotDuration,
businessId
) {
let availableSlots = [];

// Convertir todos los tiempos a objetos DateTime
let currentTime = await parseTime(openTime, businessId);
const endTime = await parseTime(closeTime, businessId);
const breakStartTime = breakStart ? await parseTime(breakStart, businessId) : null;
const breakEndTime = breakEnd ? await parseTime(breakEnd, businessId) : null;

// Pre-procesar todas las citas a objetos DateTime
const processedAppointments = await Promise.all(
appointments.map(async (appointment) => {
const start = await parseTime(appointment.start_time, businessId);
return {
start,
end: start.plus({ minutes: appointment.duration_min })
};
})
);

while (currentTime < endTime) {
const slotEnd = currentTime.plus({ minutes: slotDuration });

// Saltar horario de break
if (breakStartTime && breakEndTime &&
currentTime >= breakStartTime &&
currentTime < breakEndTime) {
currentTime = breakEndTime;
continue;
}

// Verificar conflictos con citas existentes
const hasConflict = processedAppointments.some(appointment => {
return (
(currentTime >= appointment.start && currentTime < appointment.end) ||
(slotEnd > appointment.start && slotEnd <= appointment.end) ||
(currentTime <= appointment.start && slotEnd >= appointment.end)
);
});

if (!hasConflict) {
availableSlots.push(currentTime.toFormat("HH:mm"));
}

currentTime = currentTime.plus({ minutes: slotDuration });
}

return availableSlots;
}


module.exports = { getAvailableSlots };