import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import products from './slices/ProductsSlice';
import Navbar from './slices/NavbarSlice';
import Cart from './slices/CartSlice';
import SignUpSlice from './slices/SignUpSlice';


const store = configureStore({
  reducer: {
    NavbarSlice: Navbar,
    productsSlice: products,
    CartSlice: Cart,
    SignUpSlice: SignUpSlice

  },

  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
