import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    cards: [
      {
        id: 1,
        type: 'Visa',
        number: '**** **** **** 1234',
        expiry: '12/27',
        status: 'active'
      },
      {
        id: 2,
        type: 'Mastercard',
        number: '**** **** **** 5678',
        expiry: '11/26',
        status: 'active'
      }
    ]
  });
});

export default router;