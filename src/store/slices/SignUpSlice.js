import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FIREBASE_API_KEY, FIREBASE_API_AUTH_SIGN_UP_URL, FIREBASE_AUTH_BASEURL, FIREBASE_API_AUTH_SIGN_IN_URL } from '../../firebase/firebase';

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
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message;
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



export const { userLoggedIn, userLoggedOut, extraReducers } = SignupSlice.actions;

export default SignupSlice.reducer


