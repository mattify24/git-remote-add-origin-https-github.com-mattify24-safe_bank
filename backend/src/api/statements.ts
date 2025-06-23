import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({
    statements: [
      { id: 1, month: 'May', year: 2025, url: '/statements/may-2025.pdf' },
      { id: 2, month: 'April', year: 2025, url: '/statements/april-2025.pdf' }
    ]
  });
});

export default router;