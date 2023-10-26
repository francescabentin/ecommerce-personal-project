import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const productsSlice = createSlice({
    name: 'productsSlice',
    initialState: { entities: [], loading: 'idle' },
    reducers: {
        setEntities: (state, action) => {
            state.entities = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.entities = action.payload;
            });
    },
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

const reducer = productsSlice.reducer
export default reducer

export const { setEntities } = productsSlice.actions


