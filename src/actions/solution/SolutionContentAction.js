export function solutionContentsHasErrored(bool) {
    return {
        type: 'SOLUTION_CONTENTS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function solutionContentsIsLoading(bool) {
    return {
        type: 'SOLUTION_CONTENTS_IS_LOADING',
        isLoading: bool
    };
}

export function solutionContentsFetchDataSuccess(contents) {
    return {
        type: 'SOLUTION_CONTENTS_FETCH_DATA_SUCCESS',
        contents
    };
}
export function solutionContentsAppendListSuccess(contents) {
    return {
        type: 'SOLUTION_CONTENTS_APPEND_LIST_SUCCESS',
        contents
    };
}

export function solutionContentsAppendList(url) {
    return (dispatch) => {
        dispatch(solutionContentsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(solutionContentsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((contents) => dispatch(solutionContentsAppendListSuccess(contents)))
            .catch(() => console.log("Error: contentsFetchData"));
    };
}
export function solutionContentsFetchData(url) {
    return (dispatch) => {
        dispatch(solutionContentsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(solutionContentsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((contents) => dispatch(solutionContentsFetchDataSuccess(contents)))
            .catch(() => dispatch(solutionContentsHasErrored(true)));
    };
}
