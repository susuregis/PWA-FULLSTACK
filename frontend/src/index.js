import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App'
import Main from './main'; // 
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Main /> {/* Alterado de <App /> para <Main /> */}
  </React.StrictMode>
);

reportWebVitals();
