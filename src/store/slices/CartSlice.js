import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import app from '../../firebase/config';


const firestore = getFirestore(app);


export const loadCartFromFirebase = createAsyncThunk(
    'cart/loadFromFirebase',
    async (_, { getState }) => {
        try {
            const user = getState().SignUpSlice.user;
            if (!user) {
                throw new Error('No hay usuario autenticado.');
            }

            const { localId } = user;
            const userDocRef = doc(firestore, 'usuarios', localId);
            const userDocSnapshot = await getDoc(userDocRef);

            if (userDocSnapshot.exists()) {
                const userData = userDocSnapshot.data();
                const cartData = userData.cesta || [];
                console.log(cartData);
                return cartData;

            } else {

                return [];
            }
        } catch (error) {
            throw error;
        }
    }
);

export const syncCartWithFirebase = createAsyncThunk(
    'cart/syncWithFirebase',
    async (cart, { getState }) => {
        try {
            const user = getState().SignUpSlice.user;
            if (!user) {
                throw new Error('No hay usuario autenticado.');
            }
            const { localId, email } = user;
            const cartData = cart.map(product => ({
                id: product.id,
                title: product.title,
                quantity: product.quantity,
                total: product.total,
            }));
            await setDoc(doc(firestore, 'usuarios', localId), {
                email: email,
                cesta: cartData,
            });

            return cart;
        } catch (error) {
            throw error;
        }
    }
);


const initialState = {
    allProducts: [],
    total: 0,


}

export const CartSlice = createSlice({
    name: 'CartSlice',
    initialState,
    reducers: {
        clearAndSendCart: (state, action) => {
            state.allProducts = [];
            state.total = 0;
        },

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

        },

        clearCart: (state) => {
            state.allProducts = [];
            state.total = 0;

        },
        loadCartStorage: (state, action) => {
            const cartData = action.payload;

            if (cartData) {
                state.allProducts = cartData;
                /*state.total = state.allProducts.reduce((total, p) => total + p.price * p.quantity, 0);*/
            } else {
                state.allProducts = [];
                state.total = 0;
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
    extraReducers: (builder) => {
        builder
            .addCase(syncCartWithFirebase.fulfilled, (state, action) => {
                console.log('Cesta sincronizada exitosamente con Firebase:', action.payload);
            })
            .addCase(syncCartWithFirebase.rejected, (state, action) => {
                console.error('Error al sincronizar la cesta con Firebase:', action.error);
            });
    },

});





export const { addItem, removeItem, clearCart, loadCartStorage, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;


