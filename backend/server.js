"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });

import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connect } from 'mongoose';
import bcrypt from 'bcrypt';

dotenv.config();

const router = express.Router();

// Define User schema and model
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Basic test route
router.get('/', (req, res) => {
    res.send('API is working');
});

// Register route
router.post('/auth/register', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email is already registered.' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new user
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Server error during registration.' });
    }
});

router.post('/auth/login', (req, res) => {
    res.json({ message: 'Login endpoint working' });
});

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    console.error('MONGO_URI is not defined in environment variables.');
    process.exit(1);
}

connect(mongoURI)
    .then(() => {
        console.log('Connected to MongoDB');
        app.use('/api', router);
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    });