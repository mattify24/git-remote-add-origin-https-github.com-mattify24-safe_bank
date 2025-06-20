import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import { connect } from 'mongoose';

// Import your auth routes
import authRoutes from './routes/auth';

// Initialize environment variables
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
  console.error('MONGO_URI is not defined in environment variables.');
  process.exit(1);
}

connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');

    // Basic route
    app.get('/', (req: Request, res: Response) => {
      res.send('API is working');
    });

    // Use the new auth routes
    app.use('/api/auth', authRoutes);

    // Start server
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error: unknown) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  });