export function loginReducer(state = false, action) {
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
