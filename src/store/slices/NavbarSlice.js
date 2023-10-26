import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isMenuVisible: false,
    isCartActive: false,

}

export const NavbarSlice = createSlice({
    name: 'NavbarSlice',
    initialState,
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

export default NavbarSlice.reducer


