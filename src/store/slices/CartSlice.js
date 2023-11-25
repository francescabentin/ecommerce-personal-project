import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    allProducts: [],
    total: 0,


}

export const CartSlice = createSlice({
    name: 'CartSlice',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const productToAdd = action.payload;
            const existingProduct = state.allProducts.find((product) => product.id === productToAdd.id);

            if (existingProduct) {
                existingProduct.quantity += 1;
                existingProduct.total = existingProduct.quantity * existingProduct.price;
            } else {
                state.allProducts.push({
                    ...productToAdd,
                    quantity: 1,
                    total: productToAdd.price,
                });
            }

            state.total += productToAdd.price;
            localStorage.setItem('cart', JSON.stringify(state.allProducts))
        },
        removeItem: (state, action) => {
            const productIdToRemove = action.payload.id;
            const removedProduct = state.allProducts.find((product) => product.id === productIdToRemove);

            if (removedProduct) {
                state.total -= removedProduct.total;
            }

            state.allProducts = state.allProducts.filter((product) => product.id !== productIdToRemove);
            localStorage.setItem('cart', JSON.stringify(state.allProducts))
        },

        clearCart: (state) => {
            state.allProducts = [];
            state.total = 0;
            localStorage.setItem('cart', JSON.stringify(state.allProducts))
        },
        loadLocalStorage: (state) => {
            const cartData = JSON.parse(localStorage.getItem('cart'));
            if (cartData) {
                state.allProducts = cartData
                state.total = state.allProducts.reduce((total, p) => total + p.price * p.quantity, 0)
            } else {
                return initialState
            }
        },
        updateQuantity: (state, action) => {
            const { product, quantity } = action.payload;
            const existingProduct = state.allProducts.find(p => p.id === product.id);


            if (existingProduct) {
                existingProduct.quantity = quantity
                state.total = state.allProducts.reduce((total, p) => total + p.price * p.quantity, 0)
            }
        }

    },
});





export const { addItem, removeItem, clearCart, loadLocalStorage, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;


