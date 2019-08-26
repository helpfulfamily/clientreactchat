export function channelContentsHasErrored(bool) {
    return {
        type: 'CHANNEL_CONTENTS_HAS_ERRORED',
        hasErrored: bool
    };
}



export function getChannelContentsAction(contents) {
    return {
        type: 'GET_CHANNEL_CONTENTS',
        contents
    };
}
export function appendChannelContentsAction(contents) {
    return {
        type: 'APPEND_CHANNEL_CONTENTS',
        contents
    };
}

