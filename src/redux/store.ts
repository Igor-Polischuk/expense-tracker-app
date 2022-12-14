import { configureStore } from "@reduxjs/toolkit";
import user from './slices/userSlice'
import accaunt from './slices/accauntSlice'

export const store = configureStore({
    reducer: {
        user,
        accaunt
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;