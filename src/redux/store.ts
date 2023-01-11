import { configureStore } from "@reduxjs/toolkit";
import user from './slices/userSlice';
import accaunt from './slices/accauntSlice';
import modal from './slices/modalSlice';

export const store = configureStore({
    reducer: {
        user,
        accaunt,
        modal
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;