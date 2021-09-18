import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { registerUserUrl } from "services/url";

export interface authState {
    status: "idle" | "loading" | "failed";
}

export interface signUpPayload {
    username: string;
    email: string;
    password: string;
}

const initialState: authState = {
    status: "idle",
};

export const signUp = createAsyncThunk(
    "auth/signUp",
    async (userData: signUpPayload) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            registerUserUrl,
            {
                ...userData,
            },
            config
        );

        return data;
    }
);

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.status = "loading";
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.status = "idle";
            })
            .addCase(signUp.rejected, (state, action) => {
                state.status = "failed";
            });
    },
});

export default authSlice.reducer;
