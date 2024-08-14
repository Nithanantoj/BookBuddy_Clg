import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: null,
        role: null,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
        },
        removeToken: (state) => {
            state.token = null;
            state.role = null;
        },
    },
});

export const { setToken, removeToken } = userSlice.actions;

export default userSlice.reducer;
