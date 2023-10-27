import { createSlice } from '@reduxjs/toolkit';

const initialState = {

    user: null,
    email: null,
    password: null,

}

export const LoginSlice = createSlice({
    name: 'LoginSlice',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },

        logout: (state) => {
            state.user = null;
            state.name = '';
            state.email = '';
        },

    },
});


export const { login, logout } = LoginSlice.actions;

export default LoginSlice.reducer


