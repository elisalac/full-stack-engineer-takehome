import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUserState {
    id: string | null;
    username: string | null;
    isAuthenticated: boolean;
}

export default createSlice({
    name: 'user',
    initialState: {} as IUserState,
    reducers: {
        login(state, action: PayloadAction<{ id: string; username: string }>) {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.id = null;
            state.username = null;
            state.isAuthenticated = false;
        },
    },
});