import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "services/url";

export interface authState {
    status: "idle" | "loading" | "failed";
}

export interface signUpPayload {
    username: string;
    email: string;
    password: string;
}

export interface logInPayload {
    username: string;
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
            `${API}/registration-service`,
            {
                ...userData,
            },
            config
        );

        return data;
    }
);

export const logIn = createAsyncThunk(
    "auth/logIn",
    async (userData: logInPayload) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await axios.post(
            `${API}/login-service`,
            {
                ...userData,
            },
            config
        );

        console.log(response);

        return response;
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
            })
            .addCase(logIn.pending, (state) => {
                state.status = "loading";
            })
            .addCase(logIn.fulfilled, (state, action) => {
                state.status = "idle";
            })
            .addCase(logIn.rejected, (state, action) => {
                state.status = "failed";
            });
    },
});

export default authSlice.reducer;
