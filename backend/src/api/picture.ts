import express, { Request, Response, NextFunction } from 'express';
import prisma from '../lib/prisma';
import { auth } from '../middleware/auth';

const router = express.Router();

type PictureRequestBody = {
  profileId: number;
  avatarUrl: string;
};

type PictureParams = {
  profileId: string;
};

// GET picture by profileId
router.get(
  '/pictureByProfileId/:profileId',
  async (
    req: Request<PictureParams>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { profileId } = req.params;

    try {
      const picture = await prisma.picture.findFirst({
        where: { profileId: Number(profileId) },
      });

      if (!picture) {
        res.status(404).json({ error: `Picture with profileId ${profileId} not found.` });
        // no return here
      } else {
        res.status(200).json(picture);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
    // function naturally ends here
  }
);

// POST create new picture
router.post(
  '/create',
 
  async (
    req: Request<{}, {}, PictureRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { profileId, avatarUrl } = req.body;

    try {
      const existingPicture = await prisma.picture.findUnique({
        where: { profileId: profileId },
      });

      if (existingPicture) {
        res.status(400).json({ error: 'Picture for this profileId already exists.' });
        // no return here
      } else {
        const newPicture = await prisma.picture.create({
          data: {
            profileId,
            avatarUrl,
          },
        });
        res.status(201).json(newPicture);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create picture' });
    }
  }
);

// PUT update picture
router.put(
  '/update',
  
  async (
    req: Request<{}, {}, PictureRequestBody>,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { profileId, avatarUrl } = req.body;

    try {
      const updatedPicture = await prisma.picture.update({
        where: { profileId: profileId },
        data: { avatarUrl },
      });
      res.status(200).json(updatedPicture);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Failed to update picture' });
    }
  }
);

export default router;