export function loginReducer(state = {}, action) {
    switch (action.type) {
        case 'USER_LOG_IN':
            if (typeof action.user !== 'undefined'){
                return action.user;
            }else{
                return state;
            }

            return { ...state };
        default:
            return state;
    }
}
