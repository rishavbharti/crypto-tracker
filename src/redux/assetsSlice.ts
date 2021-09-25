import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "services/url";

export interface assetsState {
    assets: {
        status: "idle" | "loading" | "failed";
        errorMessage: string;
    };
    add: {
        status: "idle" | "loading" | "failed";
        errorMessage: string;
    };
}

export interface assetPayload {
    token: string;
    quantity: number;
}

const initialState: assetsState = {
    assets: {
        status: "idle",
        errorMessage: "",
    },
    add: {
        status: "idle",
        errorMessage: "",
    },
};

export const addAsset = createAsyncThunk(
    "assets/new",
    async (asset: assetPayload) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await axios.post(
            `${API}/save-crypto-service`,
            {
                ...asset,
            },
            config
        );

        return response;
    }
);

export const assetsSlice = createSlice({
    name: "assets",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAsset.pending, (state) => {
                state.add.status = "loading";
            })
            .addCase(addAsset.fulfilled, (state, action) => {
                state.add.status = "idle";
            })
            .addCase(addAsset.rejected, (state, action) => {
                state.add.status = "failed";
            });
    },
});

export default assetsSlice.reducer;
