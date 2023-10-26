import { configureStore } from '@reduxjs/toolkit';
import products from "./slices/ProductsSlice";
import Navbar from './slices/NavbarSlice';
import Cart from './slices/CartSlice';



export const store = configureStore({
  reducer: {
    NavbarSlice: Navbar,
    productsSlice: products,
    CartSlice: Cart
  }
});