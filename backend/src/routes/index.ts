import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.get('/example', asyncHandler(async (req, res, next) => {
  res.json({ message: 'Hello' });
}));

export default router;