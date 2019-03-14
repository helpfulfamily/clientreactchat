import axios from "axios";

export function loginAction(user) {
    return {
        type: 'USER_LOG_IN',
        user
    };
}
export function logoutAction(user) {
    return {
        type: 'USER_LOG_OUT',
        user
    };
}
export function loginActionDispatcher(user) {
    return (dispatch) => {
          dispatch(loginAction(user));
    };
}
export function logoutActionDispatcher(user) {
    return (dispatch) => {
        dispatch(logoutAction(user));
    };
}