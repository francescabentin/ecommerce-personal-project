import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';
import store from "../src/store/store";
import { Provider } from 'react-redux';

const root = createRoot(document.getElementById('root'));
root.render(

  <Provider store={store}>
    <BrowserRouter basename='/ecommerce-personal-project/'>
    <App />
  </BrowserRouter>
  </Provider >
);
