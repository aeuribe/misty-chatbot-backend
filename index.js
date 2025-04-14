require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { auth } = require('express-oauth2-jwt-bearer');

// Importamos las rutas
const userRoutes = require("./routes/userRoutes");
const businessRoutes = require("./routes/businessRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const clientRoutes = require('./routes/clientRoutes');
const unavailableRoutes = require('./routes/unavailableRoutes');
const businessHoursRoutes = require('./routes/businessHoursRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const availableSlotsRoutes = require('./routes/availableSlotsRoutes');


const app = express();
app.use(express.json());
app.use(cors());

// 🔥 Crea las tablas automáticamente al iniciar
require("./config/initdb");


// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const jwtCheck = auth({
  audience: 'https://chatbot-backend/',
  issuerBaseURL: 'https://dev-0yzo8yzxc4m3apb8.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// // enforce on all endpoints
// app.use(jwtCheck);


// Ruta de prueba para verificar que el servidor está activo
app.get("/", (req, res) => {
  res.send("🚀 API funcionando correctamente!");
});

app.get('/api/public', function(req, res) {
  res.json({
    message: 'Hello from a public endpoint! You don\'t need to be authenticated to see this.'
  });
});

// This route needs authentication
app.get('/api/private', jwtCheck, function(req, res) {
  res.json({
    message: 'Hello from a private endpoint! You need to be authenticated to see this.'
  });
});

// Definir las rutas principales
app.use('/api/users', userRoutes);
app.use('/api/business',businessRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/unavailable', unavailableRoutes);
app.use('/api/businessHours',businessHoursRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/available-slots', availableSlotsRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    message: "❌ Ruta no encontrada",
    method: req.method,
    url: req.originalUrl
  });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
  console.error("❌ Error en el servidor:", err);
  res.status(500).json({ message: "Error interno del servidor" });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
