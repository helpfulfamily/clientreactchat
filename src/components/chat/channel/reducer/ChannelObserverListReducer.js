export function userHasErrored(state = false, action) {
    switch (action.type) {
        case 'CHANNEL_OBSERVER_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function  userListArrived(state = [], action)  {
    switch (action.type) {
        case 'CHANNEL_OBSERVER_LIST_ARRIVED':
            return action.userList;

        default:
            return state;
    }
}
export function userIsLoading(state = false, action) {
    switch (action.type) {
        case 'CHANNEL_OBSERVER_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function channelObserverListReducer(state = [], action) {

   switch (action.type) {
       case 'CHANNEL_OBSERVER_FETCH_DATA_SUCCESS':
            return action.users;

        default:
            return state;
    }
}
