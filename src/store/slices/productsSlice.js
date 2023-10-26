import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    productList: [],
    product: {},
}

export const productsSlice = createSlice({

    name: 'productsSlice',
    initialState,
    reducers: {
        setList: (state, action) => {
            state.productList = action.payload;
        },

        findProduct: (state, action) => {
            const { productIdNumber } = action.payload;
            const foundProduct = state.productList.find((item) => productIdNumber === item.id);
            state.product = foundProduct || null; 
        },
    }

});


export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    try {
        const data = await fetch('https://fakestoreapi.com/products').then((response) => response.json());
        console.log('Datos de la API:', data);
        return data;
    } catch (error) {
        throw error;
    }
});



export const { setList, findProduct } = productsSlice.actions

export default productsSlice.reducer;


