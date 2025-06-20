import express from 'express';
import routes from './routes'; // ensure the path is correct
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable CORS for your frontend dev server
app.use(cors({ origin: 'http://localhost:8080' }));

// Middleware to parse JSON request bodies
app.use(express.json());

// Mount your routes at /api
app.use('/api', routes);

// Optional: handle 404 for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});