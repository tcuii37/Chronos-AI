import React, { useState } from 'react';

const WhaleActivity = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [whaleData, setWhaleData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const fetchWhaleActivity = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/whales/${walletAddress}`);
      const data = await response.json();
      setWhaleData(data);
    } catch (error) {
      console.error('Error fetching whale activity:', error);
      setWhaleData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="whale-activity">
      <h2>Whale Activity</h2>
      <form onSubmit={fetchWhaleActivity}>
        <input
          type="text"
          placeholder="Enter Wallet Address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Track Whale Activity'}
        </button>
      </form>

      {whaleData && (
        <div id="whale-result">
          <h3>Whale Wallet: {whaleData.walletAddress}</h3>
          <p>Recent Transactions: {whaleData.recentTransactions}</p>
          <p>Investment Strategy: {whaleData.investmentStrategy}</p>
        </div>
      )}
    </section>
  );
};

export default WhaleActivity;
