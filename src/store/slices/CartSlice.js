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
        },
        removeItem: (state, action) => {
            const productIdToRemove = action.payload.id;
            const removedProduct = state.allProducts.find((product) => product.id === productIdToRemove);

            if (removedProduct) {
                state.total -= removedProduct.total;
            }

            state.allProducts = state.allProducts.filter((product) => product.id !== productIdToRemove);
        },

        clearCart: (state) => {
            state.allProducts = [];
            state.total = 0;
        },
    },
});




export const { addItem, removeItem, clearCart } = CartSlice.actions;

export default CartSlice.reducer;


