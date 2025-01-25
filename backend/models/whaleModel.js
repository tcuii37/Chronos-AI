const mongoose = require('mongoose');

const WhaleTransactionSchema = new mongoose.Schema(
  {
    tokenAddress: {
      type: String,
      required: true,
    },
    wallet: {
      type: String,
      required: true,
    },
    transactions: [
      {
        transactionId: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        timestamp: {
          type: Date,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('WhaleTransaction', WhaleTransactionSchema);
