export function problemContentsHasErrored(bool) {
    return {
        type: 'PROBLEM_CONTENTS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function problemContentsIsLoading(bool) {
    return {
        type: 'PROBLEM_CONTENTS_IS_LOADING',
        isLoading: bool
    };
}

export function problemContentsFetchDataSuccess(contents) {
    return {
        type: 'PROBLEM_CONTENTS_FETCH_DATA_SUCCESS',
        contents
    };
}
export function problemContentsAppendListSuccess(contents) {
    return {
        type: 'PROBLEM_CONTENTS_APPEND_LIST_SUCCESS',
        contents
    };
}

export function problemContentsAppendList(url) {
    return (dispatch) => {
        dispatch(problemContentsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(problemContentsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((contents) => dispatch(problemContentsAppendListSuccess(contents)))
            .catch(() => console.log("Error: contentsFetchData"));
    };
}
export function problemContentsFetchData(url) {
    return (dispatch) => {
        dispatch(problemContentsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(problemContentsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((contents) => dispatch(problemContentsFetchDataSuccess(contents)))
            .catch(() => dispatch(problemContentsHasErrored(true)));
    };
}
