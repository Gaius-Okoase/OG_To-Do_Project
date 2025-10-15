// Install necessary packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectToDb from './config/db.js';

dotenv.config();
connectToDb();

const app = express(); // Istantiate express class
const PORT = process.env.PORT;

// Application Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
// Middleware to log request to console
app.use((req, res, next) => {
    console.log(`Received request with ${req.method} for ${req.url}
        Header: ${req.headers}
        Body; ${req.body}`);
    next();
});

// Listen on port
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});