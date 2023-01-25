import { fetchUserData } from './thunk';
import { AuthSliceState, Status } from './types';
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthSliceState = {
    profile: null,
    status: Status.LOADING,
}


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setProfile(state, action) {
            state.profile = action.payload;
        },
        setStatus(state, action) {
            state.status = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.status = Status.LOADING;
            state.profile = null;
        });
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.status = Status.SUCCESS;
        });
        builder.addCase(fetchUserData.rejected, (state, action) => {
            state.status = Status.ERROR;
            state.profile = null;
            state.message = String(action.payload);
        });
    }
})


export const authReducer = authSlice.reducer;