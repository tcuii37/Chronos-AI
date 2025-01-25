const mongoose = require('mongoose');

const AnomalySchema = new mongoose.Schema(
  {
    tokenAddress: {
      type: String,
      required: true,
    },
    detectedAt: {
      type: Date,
      default: Date.now,
    },
    anomalyType: {
      type: String,
      enum: ['price', 'volume', 'transaction', 'other'],
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Anomaly', AnomalySchema);
