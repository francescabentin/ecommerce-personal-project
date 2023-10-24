// Fichero src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6JQUqlTZUj_qMW3zcqTFOI6VJYA3DO0o",
  authDomain: "login-d0dcd.firebaseapp.com",
  projectId: "login-d0dcd",
  storageBucket: "login-d0dcd.appspot.com",
  messagingSenderId: "878353912017",
  appId: "1:878353912017:web:bcbf2a45eca707fc7c75f0",
  measurementId: "G-S5VY8D371Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter /*basename="/ecommerce-personal-project"*/>
    <App />
  </BrowserRouter>
);