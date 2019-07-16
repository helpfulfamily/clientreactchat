export function channelHasErrored(state = false, action) {
    switch (action.type) {
        case 'CHANNEL_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function channelIsLoading(state = false, action) {
    switch (action.type) {
        case 'CHANNEL_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}
export function channel(state = {}, action) {
    switch (action.type) {
        case 'CHANNEL_CREATED':
            return action.channel;
        case 'CHANNEL_CHANGED':
            return action.channel;
        case 'OBSERVATION_CHANNEL':
            var observation= action.observation;
            var currentObserverAmount= observation.currentObserverAmount;
            state.currentObserverAmount= currentObserverAmount;
 


            return { ...state };
        default:
            return state;
    }
}
export function channelReducer(state = [], action) {

   switch (action.type) {
        case 'CHANNEL_FETCH_DATA_SUCCESS':{
            return action.channels;

        }

        default:
            return state;
    }
}
