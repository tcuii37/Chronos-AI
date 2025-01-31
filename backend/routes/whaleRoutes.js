const express = require('express');
const router = express.Router();
const {
  getWhaleTransactions,
  addWhaleTransaction,
  getWalletSummary,
} = require('../controllers/whaleActivityController');

// Route to fetch all whale transactions for a token
router.get('/:tokenAddress', getWhaleTransactions);

// Route to add a new whale transaction
router.post('/add-transaction', addWhaleTransaction);

// Route to fetch activity summary for a specific whale wallet
router.get('/wallet/:walletAddress', getWalletSummary);

module.exports = router;
