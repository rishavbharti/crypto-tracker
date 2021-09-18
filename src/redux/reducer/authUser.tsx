import { authActions } from "../actions/authUser";
import { ACTION } from "../../types/index";

export const registerUser = (state = {}, action: ACTION) => {
    const { type, payload } = action;
    switch (type) {
        case authActions.SIGN_UP_PENDING:
            return { loading: true };

        case authActions.SIGN_UP_SUCCESS:
            return { loading: false };

        case authActions.SIGN_UP_FAILURE:
            return { loading: false, error: payload };
        default:
            return state;
    }
};
