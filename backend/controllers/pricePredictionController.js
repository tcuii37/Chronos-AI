const solanaService = require('../services/solanaService');
const tf = require('@tensorflow/tfjs-node');

// Load the price prediction model
let pricePredictionModel;
(async () => {
  try {
    const modelPath = 'file://ai-models/price_prediction_model.json'; // Path to your TensorFlow model
    pricePredictionModel = await tf.loadLayersModel(modelPath);
    console.log('Price prediction model loaded successfully.');
  } catch (error) {
    console.error('Failed to load the price prediction model:', error);
  }
})();

/**
 * Predict token price
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
const predictPrice = async (req, res) => {
  try {
    const { tokenAddress } = req.query;

    if (!tokenAddress) {
      return res.status(400).json({ error: 'Token address is required.' });
    }

    // Fetch historical price data
    const priceData = await solanaService.getTokenPriceHistory(tokenAddress);

    if (!priceData || priceData.length === 0) {
      return res.status(404).json({ error: 'No price data found for this token.' });
    }

    // Prepare the data for prediction
    const inputTensor = tf.tensor2d(priceData, [1, priceData.length]);

    // Make predictions using the AI model
    const predictions = pricePredictionModel.predict(inputTensor).dataSync();

    return res.status(200).json({
      tokenAddress,
      predictions: Array.from(predictions), // Convert Float32Array to Array
    });
  } catch (error) {
    console.error('Error predicting price:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { predictPrice };
