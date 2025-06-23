import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';

import emojis from './emojis';
import posts from './posts';
import users from './users';
import profile from './profile';
import picture from './picture';
import like from './like';

import signup from './signup';
import login from './login';
import accounts from './accounts';
import cards from './cards';
import statements from './statements';
import transactions from './transactions';
import transfer from './transfer'; // Ensure transfer.ts exports default router
import dashboard from './dashboard';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

// General endpoints
router.use('/emojis', emojis);
router.use('/users', users);
router.use('/posts', posts);
router.use('/profile', profile);
router.use('/picture', picture);
router.use('/like', like);

// Banking endpoints
router.use('/signup', signup);
router.use('/login', login);
router.use('/accounts', accounts);
router.use('/cards', cards);
router.use('/statements', statements);
router.use('/transactions', transactions);
router.use('/transfer', transfer);
router.use('/dashboard', dashboard);

export default router;