require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB, client, DB_NAME } = require('./config/database');
const patientRoutes = require('./routes/patientRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const vitalSignsRoutes = require('./routes/vitalSignsRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('Hospital Management API is running...');
});

// Mount routes
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/vital-signs', vitalSignsRoutes);

const PORT = process.env.PORT || 9000;

async function startServer() {
    try {
        // Connect to MongoDB
        await connectDB();
        
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error(`Failed to start server: ${error.message}`);
        process.exit(1);
    }
}

startServer(); 