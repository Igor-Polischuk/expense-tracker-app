import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';

export interface UserState {
    email: string;
    uid: string
}

const initialState: UserState = {
    email: '',
    uid: '',
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, actions: PayloadAction<UserState>) => {
            state.email = actions.payload.email;
            state.uid   = actions.payload.uid;
        }
    }
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;