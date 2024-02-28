import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
fetch('/account')
  .then(response => response.json())
  .then(data => {
    if (data.error === 'Not Authenticated') {
      window.location.href = '/auth/steam';
    } else {
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
