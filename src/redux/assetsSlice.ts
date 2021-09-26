import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "services/url";
import { parseJwt, config } from "utils";

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
    "assets/add",
    async (asset: assetPayload) => {
        const username = parseJwt(
            localStorage.getItem("accessToken")
        )?.username;

        if (!username) {
            throw new Error("Invalid token");
        }

        const response = await axios.post(
            `${API}/assets-service`,
            {
                username: username,
                ...asset,
            },
            config
        );

        return response?.data;
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
