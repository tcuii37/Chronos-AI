const mongoose = require('mongoose');

const PriceSchema = new mongoose.Schema(
  {
    tokenAddress: {
      type: String,
      required: true,
    },
    historicalPrices: {
      type: [Number], // Array of price values
      required: true,
    },
    predictedPrices: {
      type: [Number], // Array of predicted price values
      default: [],
    },
    lastUpdated: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Price', PriceSchema);
