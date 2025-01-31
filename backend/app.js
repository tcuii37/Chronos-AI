const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const anomalyRoutes = require('./routes/anomalyRoutes');
const predictionRoutes = require('./routes/predictionRoutes');
const whaleRoutes = require('./routes/whaleRoutes');

require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/anomalies', anomalyRoutes);
app.use('/api/predictions', predictionRoutes);
app.use('/api/whales', whaleRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

module.exports = app;
