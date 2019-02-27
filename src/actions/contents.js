export function contentsHasErrored(bool) {
    return {
        type: 'CONTENTS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function contentsIsLoading(bool) {
    return {
        type: 'CONTENTS_IS_LOADING',
        isLoading: bool
    };
}

export function contentsFetchDataSuccess(contents) {
    return {
        type: 'CONTENTS_FETCH_DATA_SUCCESS',
        contents
    };
}

export function contentsFetchData(url) {
    return (dispatch) => {
        dispatch(contentsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(contentsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((contents) => dispatch(contentsFetchDataSuccess(contents)))
            .catch(() => dispatch(contentsHasErrored(true)));
    };
}
