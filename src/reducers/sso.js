export function loginReducer(state = {}, action) {
    switch (action.type) {
        case 'USER_LOG_IN':
            if (typeof action.user !== 'undefined'){
                return action.user;
            }else{
                return state;
            }
        case 'OBSERVATION_CHANNEL':
            var observation= action.observaton;
            var channelName= observation.channelName;
            var id= observation.channelId;
            var channel = {id: id, name: channelName};
            if(typeof state.channels == "undefined"){
                state.channels = [];
            }

            state.channels.push(channel);
            return { ...state };
        default:
            return state;
    }
}
