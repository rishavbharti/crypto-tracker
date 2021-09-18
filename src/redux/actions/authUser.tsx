import axios from "axios";

import { ACTION } from "../../types/index";
import { registerUserUrl } from "../../services/url";

export const authActions = {
    SIGN_UP_PENDING: "SIGN_UP_PENDING",
    SIGN_UP_SUCCESS: "SIGN_UP_SUCCESS",
    SIGN_UP_FAILURE: "SIGN_UP_FAILURE",
};

export const registerUser =
    (username: string, email: string, password: string) =>
    async (dispatch: (arg0: ACTION) => void) => {
        try {
            dispatch({
                type: authActions.SIGN_UP_PENDING,
            });

            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                registerUserUrl,
                {
                    username,
                    email,
                    password,
                },
                config
            );

            dispatch({
                type: authActions.SIGN_UP_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: authActions.SIGN_UP_FAILURE,
                payload: error,
            });
        }
    };
