export function channelContentsHasErrored(bool) {
    return {
        type: 'CHANNEL_CONTENTS_HAS_ERRORED',
        hasErrored: bool
    };
}


export function transactionChannelContent(transaction) {
    return {
        type: 'TRANSACTION_CHANNEL_CONTENT',
        transaction
    };
}

export function getChannelContentsAction(channelContents) {
    return {
        type: 'GET_CHANNEL_CONTENTS',
        channelContents
    };
}
export function appendChannelContentsAction(channelContents) {
    return {
        type: 'APPEND_CHANNEL_CONTENTS',
        channelContents
    };
}

