import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productsSlice from './slices/productsSlice';
import NavbarSlice from './slices/NavbarSlice';
import CartSlice from './slices/CartSlice';


const rootReducer = combineReducers({
  NavbarSlice: NavbarSlice,
  productsSlice: productsSlice,
  CartSlice: CartSlice
});

export const store = configureStore({
  reducer: rootReducer
});