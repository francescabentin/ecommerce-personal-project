// Fichero src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter /*basename="/ecommerce-personal-project"*/>
    <App />
  </BrowserRouter>
);