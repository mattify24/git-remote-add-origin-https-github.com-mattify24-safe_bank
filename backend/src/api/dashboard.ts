import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    welcome: 'Welcome to your dashboard!',
    accounts: 2,
    cards: 2,
    recentTransactions: [
      { id: 1, date: '2025-06-20', amount: -50, description: 'Grocery Store' }
    ],
  });
});

export default router;