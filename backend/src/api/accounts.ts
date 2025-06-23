import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    accounts: [
      { id: 1, type: 'Checking', balance: 1500.25, currency: 'USD' },
      { id: 2, type: 'Savings', balance: 3200.00, currency: 'USD' }
    ]
  });
});

export default router;