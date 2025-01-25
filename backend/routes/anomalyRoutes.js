const express = require('express');
const router = express.Router();
const {
  getAllAnomalies,
  getAnomalyById,
  detectAnomaly,
} = require('../controllers/anomalyController');

// Route to fetch all detected anomalies
router.get('/', getAllAnomalies);

// Route to fetch a specific anomaly by its ID
router.get('/:id', getAnomalyById);

// Route to detect and save a new anomaly
router.post('/detect', detectAnomaly);

module.exports = router;
