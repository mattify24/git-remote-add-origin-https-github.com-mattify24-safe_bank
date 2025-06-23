import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

// In-memory accounts data; replace with your database logic in production
interface Account {
  id: string;
  name: string;
  number: string;
  balance: number;
}

const accounts: Record<string, Account> = {
  '1': { id: '1', name: 'Primary Checking', number: '1234', balance: 5420.50 },
  '2': { id: '2', name: 'Emergency Fund Savings', number: '5678', balance: 12750.00 },
  '3': { id: '3', name: 'Rewards Credit Card', number: '9012', balance: -1250.00 },
};

// POST /api/transfer
router.post('/transfer', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { fromAccount, toAccount, amount, description } = req.body;

  // Validation
  if (!fromAccount || !toAccount || !amount) {
    res.status(400).json({ message: 'Missing required fields' });
    return;  // Ensure the handler finishes after sending a response
  }

  if (fromAccount === toAccount) {
    res.status(400).json({ message: 'Source and destination accounts must be different' });
    return;
  }

  const fromAcc = accounts[fromAccount];
  const toAcc = accounts[toAccount];

  if (!fromAcc || !toAcc) {
    res.status(404).json({ message: 'Account not found' });
    return;
  }

  const transferAmount = parseFloat(amount);
  if (isNaN(transferAmount) || transferAmount <= 0) {
    res.status(400).json({ message: 'Invalid transfer amount' });
    return;
  }

  if (fromAcc.balance < transferAmount) {
    res.status(400).json({ message: 'Insufficient funds in source account' });
    return;
  }

  // Perform transfer
  fromAcc.balance -= transferAmount;
  toAcc.balance += transferAmount;

  // In production, save these changes to your database here

  // Send the response without returning anything
  res.status(200).json({
    message: 'Transfer successful',
    transferDetails: {
      from: `${fromAcc.name} (${fromAcc.number})`,
      to: `${toAcc.name} (${toAcc.number})`,
      amount: transferAmount,
      date: new Date().toISOString(),
      description: description || '',
    },
  });
});

export default router;