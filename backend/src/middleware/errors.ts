import express, { NextFunction, Request, Response } from 'express';

interface ErrorResponse {
  message: string;
  stack?: string | false;
}

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Example route
app.get('/api/example', (req: Request, res: Response) => {
  res.json({ message: 'This is an example route.' });
});

// 404 Not Found middleware should come **after** all route handlers
function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`);
  next(error);
}

// Error handling middleware should come **after** notFound
function errorHandler(
  err: Error,
  req: Request,
  res: Response<ErrorResponse>,
  next: NextFunction
) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  });
}

// Register middlewares in correct order
app.use(notFound);       // Handle 404 errors after all routes
app.use(errorHandler);   // Handle errors after all middleware

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});