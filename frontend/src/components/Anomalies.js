import React, { useState } from 'react';

const Anomalies = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [anomalyData, setAnomalyData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const fetchAnomalies = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/anomalies/token/${tokenAddress}`);
      const data = await response.json();
      setAnomalyData(data);
    } catch (error) {
      console.error('Error fetching anomalies:', error);
      setAnomalyData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="anomalies">
      <h2>Anomaly Detection</h2>
      <form onSubmit={fetchAnomalies}>
        <input
          type="text"
          placeholder="Enter Token Address"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Check Anomalies'}
        </button>
      </form>

      {anomalyData && (
        <div id="anomaly-info">
          <h3>Detected Anomalies for Token: {anomalyData.tokenName}</h3>
          <p>Price Anomaly: {anomalyData.priceAnomaly ? 'Yes' : 'No'}</p>
          <p>Volume Anomaly: {anomalyData.volumeAnomaly ? 'Yes' : 'No'}</p>
          <p>Recent Transactions: {anomalyData.recentTransactions}</p>
        </div>
      )}
    </section>
  );
};

export default Anomalies;
