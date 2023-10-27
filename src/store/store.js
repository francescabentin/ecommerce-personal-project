import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import products from './slices/ProductsSlice';
import Navbar from './slices/NavbarSlice';
import Cart from './slices/CartSlice';


const store = configureStore({
  reducer: {
    NavbarSlice: Navbar,
    productsSlice: products,
    CartSlice: Cart,

  },
  middleware: [thunk],
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
