import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, query, collection, getDocs } from 'firebase/firestore';
import app from '../../firebase/config';

const firestore = getFirestore(app);


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
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.productList = action.payload;
            });
    }

});


export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    try {
        // const data = await fetch('https://fakestoreapi.com/products').then((response) => response.json());
        const q = query(collection(firestore, "productos"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return data;
    } catch (error) {
        throw error;
    }
});



export const { setList, findProduct } = productsSlice.actions

export default productsSlice.reducer;


