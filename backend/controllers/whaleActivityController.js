const solanaService = require('../services/solanaService');

/**
 * Monitor whale activity
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const monitorWhaleActivity = async (req, res) => {
  try {
    const { tokenAddress, threshold } = req.query;

    if (!tokenAddress) {
      return res.status(400).json({ error: 'Token address is required.' });
    }

    // Default threshold for whale transactions (e.g., 1,000 tokens)
    const whaleThreshold = threshold ? parseFloat(threshold) : 1000;

    // Fetch recent transactions for the token
    const transactions = await solanaService.getTokenTransactions(tokenAddress);

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: 'No transaction data found for this token.' });
    }

    // Filter whale transactions
    const whaleTransactions = transactions.filter(tx => tx.amount >= whaleThreshold);

    // Group transactions by wallet address
    const whaleActivity = whaleTransactions.reduce((acc, tx) => {
      if (!acc[tx.wallet]) {
        acc[tx.wallet] = { totalAmount: 0, transactions: [] };
      }
      acc[tx.wallet].totalAmount += tx.amount;
      acc[tx.wallet].transactions.push(tx);
      return acc;
    }, {});

    return res.status(200).json({
      tokenAddress,
      whaleActivity,
      totalWhaleTransactions: whaleTransactions.length,
    });
  } catch (error) {
    console.error('Error monitoring whale activity:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { monitorWhaleActivity };
