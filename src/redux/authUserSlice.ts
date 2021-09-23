import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "services/url";

export interface authState {
    status: "idle" | "loading" | "failed";
    errorMessage: string;
    isAuthenticated: boolean;
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
    errorMessage: "",
    isAuthenticated: Boolean(localStorage.getItem("accessToken")),
};

export const signUp = createAsyncThunk(
    "auth/signUp",
    async (userData: signUpPayload) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await axios.post(
            `${API}/registration-service`,
            {
                ...userData,
            },
            config
        );

        return response;
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
                const { payload } = action;
                state.status = "idle";
                window.localStorage.setItem("accessToken", payload.data);
                state.isAuthenticated = true;
                state.errorMessage = "";

                window.location.replace("/#/dashboard/");
            })
            .addCase(logIn.rejected, (state, action) => {
                state.errorMessage =
                    "Error: Unable to login, details do not match";
                state.status = "failed";
            });
    },
});

export default authSlice.reducer;
