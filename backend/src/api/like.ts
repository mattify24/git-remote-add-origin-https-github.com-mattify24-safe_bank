import express, { Request, Response, NextFunction } from 'express';
// Adjust path as necessary
import { asyncHandler } from '../utils/asyncHandler'; 
import prisma from '../lib/prisma';
import { auth } from '../middleware/auth';

const router = express.Router();

// GET /likes - Retrieve all likes
router.get('/', asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const likes = await prisma.like.findMany({});
  res.status(200).json(likes); // no return
}));

// POST /likes/create - Create a new like
router.post('/create', auth, asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { postId, profileId } = req.body;

  if (!postId || !profileId) {
    res.status(400).json({ error: 'postId and profileId are required' });
    return; // optional early return
  }

  const result = await prisma.like.create({
    data: {
      postId,
      profileId,
    },
  });
  res.status(200).json(result); // no return
}));

export default router;