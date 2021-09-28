import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "services/url";
import { parseJwt, config } from "utils";

export interface assetsState {
    assets: {
        status: "idle" | "loading" | "failed";
        data: any[];
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
        data: [],
        errorMessage: "",
    },
    add: {
        status: "idle",
        errorMessage: "",
    },
};

export const fetchAssets = createAsyncThunk("assets/fetch", async () => {
    const username = parseJwt(localStorage.getItem("accessToken"))?.username;

    if (!username) {
        throw new Error("Invalid token");
    }

    const response = await axios.get(
        `${API}/portfolio-service?username=${username}`,
        config
    );

    return response?.data;
});

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
            .addCase(fetchAssets.pending, (state) => {
                state.assets.status = "loading";
            })
            .addCase(fetchAssets.fulfilled, (state, action) => {
                const { payload } = action;
                state.assets.status = "idle";
                state.assets.data = payload;
            })
            .addCase(fetchAssets.rejected, (state, action) => {
                state.assets.status = "failed";
            })

            .addCase(addAsset.pending, (state) => {
                state.add.status = "loading";
            })
            .addCase(addAsset.fulfilled, (state, action) => {
                const {
                    payload: { assets },
                } = action;

                const _assets = Object.entries(assets).map((asset: any[]) => {
                    return { token: asset[0], ...asset[1] };
                });

                state.add.status = "idle";
                state.assets.data = _assets;
            })
            .addCase(addAsset.rejected, (state, action) => {
                state.add.status = "failed";
            });
    },
});

export default assetsSlice.reducer;
