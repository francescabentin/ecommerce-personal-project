import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: {
        productList: [],


    },

    reducers: {
        setList: (state, action) => {
            state.productList = action.payload;

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



export const { setList, setSingleProduct } = productsSlice.actions


