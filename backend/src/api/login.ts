import { Router, Request, Response } from 'express';

const router = Router();

// Use the same in-memory users array as in signup.ts
const users: { email: string; password: string }[] = [
  { email: 'demo@bank.com', password: 'demo123' }
];

router.post(
  '/',
  (req: Request, res: Response): void => {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const user = users.find(u => u.email === email && u.password === password);
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    res.json({ message: 'Login successful', user: { email } });
  }
);

export default router;