import React, { useState } from 'react';

const Predictions = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [predictionData, setPredictionData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPredictions = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/predictions/token/${tokenAddress}`);
      const data = await response.json();
      setPredictionData(data);
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setPredictionData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="predictions">
      <h2>Token Predictions</h2>
      <form onSubmit={fetchPredictions}>
        <input
          type="text"
          placeholder="Enter Token Address"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Predictions'}
        </button>
      </form>

      {predictionData && (
        <div id="prediction-result">
          <h3>Prediction for Token: {predictionData.tokenName}</h3>
          <p>Expected Price: ${predictionData.predictedPrice}</p>
          <p>Market Trend: {predictionData.marketTrend}</p>
        </div>
      )}
    </section>
  );
};

export default Predictions;
