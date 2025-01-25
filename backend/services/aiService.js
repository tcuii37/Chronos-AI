const tf = require('@tensorflow/tfjs-node');
const path = require('path');
const anomalyModelPath = path.resolve(__dirname, '../ai-models/anomaly_model.json');
const pricePredictionModelPath = path.resolve(__dirname, '../ai-models/price_prediction_model.json');

// Load and initialize the AI models
let anomalyModel;
let pricePredictionModel;

async function loadModels() {
  anomalyModel = await tf.loadLayersModel(`file://${anomalyModelPath}`);
  pricePredictionModel = await tf.loadLayersModel(`file://${pricePredictionModelPath}`);
}

// Function to detect anomalies in the token data
async function detectAnomaly(tokenData) {
  try {
    if (!anomalyModel) {
      await loadModels();
    }
    const inputData = tf.tensor([tokenData]);
    const prediction = anomalyModel.predict(inputData);
    return prediction.dataSync();
  } catch (error) {
    console.error('Error detecting anomaly:', error);
    throw error;
  }
}

// Function to predict future token prices based on historical data
async function predictPrice(historicalData) {
  try {
    if (!pricePredictionModel) {
      await loadModels();
    }
    const inputData = tf.tensor([historicalData]);
    const prediction = pricePredictionModel.predict(inputData);
    return prediction.dataSync();
  } catch (error) {
    console.error('Error predicting price:', error);
    throw error;
  }
}

module.exports = { detectAnomaly, predictPrice };
