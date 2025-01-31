const fetch = require('node-fetch');

// Function to get token price from the Solana blockchain
async function getTokenPrice(tokenAddress) {
  try {
    const response = await fetch(`https://api.mainnet-beta.solana.com`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getTokenAccountBalance',
        params: [tokenAddress],
      }),
    });

    const data = await response.json();
    if (data.result) {
      return data.result.value.uiAmount;
    } else {
      throw new Error('Token price data not available');
    }
  } catch (error) {
    console.error('Error fetching token price:', error);
    throw error;
  }
}

// Function to get recent transactions for a specific wallet address on Solana
async function getWalletTransactions(walletAddress) {
  try {
    const response = await fetch('https://api.mainnet-beta.solana.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'getConfirmedSignaturesForAddress2',
        params: [walletAddress, { limit: 10 }],
      }),
    });

    const data = await response.json();
    if (data.result) {
      return data.result;
    } else {
      throw new Error('Transactions not found');
    }
  } catch (error) {
    console.error('Error fetching wallet transactions:', error);
    throw error;
  }
}

module.exports = { getTokenPrice, getWalletTransactions };
