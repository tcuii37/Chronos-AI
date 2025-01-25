const solanaService = require('../services/solanaService');
const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

// Load the anomaly detection model
let anomalyModel;
(async () => {
  try {
    const modelPath = 'file://ai-models/anomaly_model.json'; // Path to your TensorFlow model
    anomalyModel = await tf.loadLayersModel(modelPath);
    console.log('Anomaly detection model loaded successfully.');
  } catch (error) {
    console.error('Failed to load the anomaly detection model:', error);
  }
})();

/**
 * Detect anomalies in token transactions
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const detectAnomalies = async (req, res) => {
  try {
    const { tokenAddress } = req.query;

    if (!tokenAddress) {
      return res.status(400).json({ error: 'Token address is required.' });
    }

    // Fetch transaction data from Solana
    const transactions = await solanaService.getTokenTransactions(tokenAddress);

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ error: 'No transaction data found for this token.' });
    }

    // Prepare the transaction data for anomaly detection
    const transactionVolumes = transactions.map(tx => tx.amount || 0); // Replace `tx.amount` with the correct field

    // Detect anomalies using the AI model if it's loaded
    if (anomalyModel) {
      const inputTensor = tf.tensor2d(transactionVolumes, [1, transactionVolumes.length]);
      const predictions = anomalyModel.predict(inputTensor).dataSync();

      // Anomalies are values with a high anomaly score
      const anomalies = transactionVolumes.filter((_, idx) => predictions[idx] > 0.5); // Adjust threshold as needed

      return res.status(200).json({
        anomalies,
        totalTransactions: transactionVolumes.length,
        anomalyCount: anomalies.length,
      });
    } else {
      // Fallback: Rule-based anomaly detection
      const mean = transactionVolumes.reduce((a, b) => a + b, 0) / transactionVolumes.length;
      const stdDev = Math.sqrt(
        transactionVolumes.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / transactionVolumes.length
      );

      const anomalies = transactionVolumes.filter(value => Math.abs(value - mean) > 2 * stdDev); // 2 standard deviations

      return res.status(200).json({
        anomalies,
        totalTransactions: transactionVolumes.length,
        anomalyCount: anomalies.length,
      });
    }
  } catch (error) {
    console.error('Error detecting anomalies:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { detectAnomalies };
