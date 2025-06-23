import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    transactions: [
      { id: 1, date: '2025-06-20', amount: -50, description: 'Grocery Store', accountId: 1 },
      { id: 2, date: '2025-06-19', amount: 2000, description: 'Salary', accountId: 1 }
    ]
  });
});

export default router;