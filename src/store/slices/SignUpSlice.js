import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FIREBASE_API_AUTH_SIGN_UP_URL, FIREBASE_AUTH_BASEURL, FIREBASE_API_AUTH_SIGN_IN_URL } from '../../firebase/firebase';
import app from '../../firebase/config';
import { doc, setDoc, getFirestore, getDoc, updateDoc } from 'firebase/firestore';


const firestore = getFirestore(app);

async function createUserDocument(localId, userData) {
    try {
        await setDoc(doc(firestore, 'usuarios', localId), {
            email: userData.email,
            cesta: {}
        });
    } catch (error) {
        console.error('Error al crear el documento del usuario:', error);
        throw error;
    }
}

async function updateUserDocument(userData) {
    const { localId, email } = userData;

    try {

        const userDocRef = doc(firestore, 'usuarios', localId);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {

            await updateDoc(userDocRef, {
                email: email,
            });
            console.log('Documento del usuario actualizado exitosamente.');
        } else {
            console.warn('El campo "password" no es un string o es undefined.');
        }

    } catch (error) {
        console.error('Error al actualizar el documento del usuario en Firestore:', error);
        throw error;
    }
}




const initialState = {

    user: null,
    isAuthenticated: false,
    isLoading: false,
    isError: false,
    error: null,


}

export const SignupSlice = createSlice({
    name: 'SignUpSlice',
    initialState,
    reducers: {

        userLoggedIn: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = true;
        },
        userLoggedOut: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },


    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                createUserDocument(action.payload);
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;

            })
            .addCase(signIn.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(signIn.rejected, (state, action) => {
                if (action.error.message === 'INVALID_LOGIN_CREDENTIALS') {
                    state.isAuthenticated = false;
                    state.error = 'Credenciales incorrectas';
                } else {
                    state.isLoading = false;
                    state.isError = true;
                    state.error = action.error.message;
                }

            });

    },
});



export const signUp = createAsyncThunk(
    'auth/signUp',
    async (payload, thunkAPI) => {
        try {
            const response = await fetch(`${FIREBASE_AUTH_BASEURL}${FIREBASE_API_AUTH_SIGN_UP_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),

            });

            if (response.ok) {
                const data = await response.json();
                const localId = data.localId;
                await createUserDocument(localId, payload);
                return data;
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error.message);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


export const signIn = createAsyncThunk(
    'auth/signIn',
    async (payload, thunkAPI) => {
        try {
            const response = await fetch(`${FIREBASE_AUTH_BASEURL}${FIREBASE_API_AUTH_SIGN_IN_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),

            });

            const data = await response.json();
            if (data.error) {
                return thunkAPI.rejectWithValue({ error: 'algo salio mal' });

            }
            await updateUserDocument(data);
            return data
        }
        catch (error) {
            return thunkAPI.rejectWithValue({ error });
        }
    }
);






export const { userLoggedIn, userLoggedOut, extraReducers } = SignupSlice.actions;

export default SignupSlice.reducer


