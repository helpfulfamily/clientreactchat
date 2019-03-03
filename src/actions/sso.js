import axios from "axios";

export function loginAction(keycloak) {
    return {
        type: 'USER_LOG_IN',
        keycloak
    };
}
export function logoutAction(keycloak) {
    return {
        type: 'USER_LOG_OUT',
        keycloak
    };
}
export function loginActionDispatcher(keycloak) {
    return (dispatch) => {
          dispatch(loginAction(keycloak));
    };
}
export function logoutActionDispatcher(keycloak) {
    return (dispatch) => {
        dispatch(logoutAction(keycloak));
    };
}