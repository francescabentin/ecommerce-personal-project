import { createSlice } from '@reduxjs/toolkit';

export const NavbarSlice = createSlice({
    name: 'NavbarSlice',
    initialState: {
        isMenuVisible: false,
        isCartActive: false,
    },
    reducers: {
        toggleMenu: (state) => {
            state.isMenuVisible = !state.isMenuVisible;
        },
        CloseMenu: (state) => {
            state.isMenuVisible = false;
        },
        toggleActive: (state) => {
            state.isCartActive = !state.isCartActive;
        },
    },
});


export const { toggleMenu, CloseMenu, toggleActive } = NavbarSlice.actions;


