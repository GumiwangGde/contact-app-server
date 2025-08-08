import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes.js';
import labelRoutes from './routes/labelRoutes.js';
import authRoutes from './routes/authRoutes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../swaggerConfig.js'; 

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/public', express.static('public'));

// Routes
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/labels', labelRoutes);
app.use('/api/v1/auth', authRoutes);

const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected...");
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
        console.log(`http://localhost:5000/api-docs`)
    } catch (err) {
        console.log("DB Connection Error: " + err);
    }
}

startServer();