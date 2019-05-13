export function channelHasErrored(state = false, action) {
    switch (action.type) {
        case 'CHANNEL_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}
