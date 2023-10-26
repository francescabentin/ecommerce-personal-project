import { configureStore } from '@reduxjs/toolkit';
import { productsSlice } from "../store/slices/productsSlice";
import { NavbarSlice } from './slices/NavbarSlice';
import { CartSlice } from './slices/CartSlice';



export const store = configureStore({
  reducer: {
    NavbarSlice: NavbarSlice.reducer,
    productsSlice: productsSlice.reducer,
    CartSlice: CartSlice.reducer,

  }
});