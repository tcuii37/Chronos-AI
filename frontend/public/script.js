document.getElementById('token-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const tokenAddress = document.getElementById('token-address').value;
    
    try {
      const response = await fetch(`/api/anomalies/token/${tokenAddress}`);
      const data = await response.json();
      
      if (data.success) {
        displayTokenResult(data);
      } else {
        alert('No data found for this token');
      }
    } catch (error) {
      console.error('Error fetching token data:', error);
    }
  });
  
  document.getElementById('whale-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const walletAddress = document.getElementById('whale-wallet').value;
  
    try {
      const response = await fetch(`/api/whales/${walletAddress}`);
      const data = await response.json();
  
      if (data.success) {
        displayWhaleResult(data);
      } else {
        alert('No whale activity data found for this wallet');
      }
    } catch (error) {
      console.error('Error fetching whale data:', error);
    }
  });
  
  function displayTokenResult(data) {
    const tokenResultDiv = document.getElementById('token-result');
    tokenResultDiv.innerHTML = `
      <h3>Token: ${data.tokenName}</h3>
      <p>Price: $${data.tokenPrice}</p>
      <p>Volume: ${data.volume}</p>
      <p>Recent Transactions: ${data.recentTransactions}</p>
    `;
  }
  
  function displayWhaleResult(data) {
    const whaleResultDiv = document.getElementById('whale-result');
    whaleResultDiv.innerHTML = `
      <h3>Whale Wallet: ${data.walletAddress}</h3>
      <p>Recent Transactions: ${data.recentTransactions}</p>
      <p>Investment Strategy: ${data.investmentStrategy}</p>
    `;
  }
  