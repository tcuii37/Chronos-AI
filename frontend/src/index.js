import React from 'react';
import ReactDOM from 'react-dom';
import App from '/app';
import './index.css';  // Global CSS, optional if you're using any styles globally

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
