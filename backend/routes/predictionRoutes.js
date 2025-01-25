const express = require('express');
const router = express.Router();
const {
  getPricePredictions,
  addHistoricalPrices,
  predictPrices,
} = require('../controllers/pricePredictionController');

// Route to fetch price predictions for a token
router.get('/:tokenAddress', getPricePredictions);

// Route to add historical price data
router.post('/add-historical-prices', addHistoricalPrices);

// Route to generate price predictions using AI
router.post('/predict', predictPrices);

module.exports = router;
