import { Router } from 'express';

const router = Router();

// Example route
router.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

export default router;