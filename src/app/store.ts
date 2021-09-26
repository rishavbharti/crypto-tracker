import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import authUserReducer from "redux/authUserSlice";
import assetsReducer from "redux/assetsSlice";

export const store = configureStore({
    reducer: {
        auth: authUserReducer,
        assets: assetsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
