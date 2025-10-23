// Install necessary packages
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectToDb from './config/db.js';
import { User } from './models/User.js';

// Load environment variables
dotenv.config();
// Connect to Database
connectToDb();
// Initialize express app
const app = express(); 
const PORT = process.env.PORT || 4500;

// Application Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
// Middleware to log request to console
app.use(morgan('dev'));

// Listen on port
const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});