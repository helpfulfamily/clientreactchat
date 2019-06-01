export function channelContentsHasErrored(bool) {
    return {
        type: 'CHANNEL_CONTENTS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function channelContentsIsLoading(bool) {
    return {
        type: 'CHANNEL_CONTENTS_IS_LOADING',
        isLoading: bool
    };
}

export function channelContentsFetchDataSuccess(contents) {
    return {
        type: 'CHANNEL_CONTENTS_FETCH_DATA_SUCCESS',
        contents
    };
}
export function channelContentsAppendListSuccess(contents) {
    return {
        type: 'CHANNEL_CONTENTS_APPEND_LIST_SUCCESS',
        contents
    };
}

export function channelContentsAppendList(url) {
    return (dispatch) => {
        dispatch(channelContentsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(channelContentsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((contents) => dispatch(channelContentsAppendListSuccess(contents)))
            .catch(() => console.log("Error: contentsFetchData"));
    };
}
export function channelContentsFetchData(url) {
    return (dispatch) => {
        dispatch(channelContentsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(channelContentsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((contents) => dispatch(channelContentsFetchDataSuccess(contents)))
            .catch(() => dispatch(channelContentsHasErrored(true)));
    };
}
