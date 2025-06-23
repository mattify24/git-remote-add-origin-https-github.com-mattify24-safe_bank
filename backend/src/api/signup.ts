import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

// Use globalThis to persist users in dev (not for production!)
(globalThis as any).users = (globalThis as any).users || [];
const users: { email: string; password: string }[] = (globalThis as any).users;

router.post(
  '/',
  (req: Request, res: Response, next: NextFunction): void => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password required' });
      return; // OK to just do res.status().json() without return, but 'return' is fine here.
    }

    const exists = users.find((u) => u.email === email);
    if (exists) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }

    users.push({ email, password });
    res.json({ message: 'Signup successful' });
  }
);

export default router;