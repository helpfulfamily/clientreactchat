export function loginReducer(state ={}, action) {
    switch (action.type) {
        case 'USER_LOG_IN':
            if (typeof action.keycloak !== 'undefined'){
                return action.keycloak;
            }else{
                return state;
            }

        default:
            return state;
    }
}
export function logoutReducer(state ={}, action) {
    switch (action.type) {
        case 'USER_LOG_OUT':
            if (typeof action.keycloak !== 'undefined'){
                return action.keycloak;
             }else{
                return state;
            }


        default:
            return state;
    }
}
