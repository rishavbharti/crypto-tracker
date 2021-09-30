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
        status: "idle" | "loading" | "success" | "failed";
        errorMessage: string;
    };
    delete: {
        status: "idle" | "loading" | "failed";
        errorMessage: string;
    };
}

export interface addAssetPayload {
    token: string;
    quantity: number;
}

export interface deleteAssetPayload {
    token: string;
    index: number;
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
    delete: {
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
    async (asset: addAssetPayload) => {
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

export const deleteAsset = createAsyncThunk(
    "assets/delete",
    async (asset: deleteAssetPayload) => {
        const username = parseJwt(
            localStorage.getItem("accessToken")
        )?.username;

        if (!username) {
            throw new Error("Invalid token");
        }

        await axios.post(
            `${API}/assets-service`,
            {
                username: username,
                token: asset.token,
                action: "DELETE",
            },
            config
        );

        return asset.index;
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
                state.add.status = "success";
            })
            .addCase(addAsset.rejected, (state, action) => {
                state.add.status = "failed";
            })

            .addCase(deleteAsset.pending, (state) => {
                state.delete.status = "loading";
            })
            .addCase(deleteAsset.fulfilled, (state, action) => {
                const { payload } = action;
                state.delete.status = "idle";
                state.assets.data.splice(payload, 1);
            })
            .addCase(deleteAsset.rejected, (state, action) => {
                state.delete.status = "failed";
            });
    },
});

export default assetsSlice.reducer;
