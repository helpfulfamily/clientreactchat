export function contentsHasErrored(state = false, action) {
    switch (action.type) {
        case 'CONTENTS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function contentsIsLoading(state = false, action) {
    switch (action.type) {
        case 'CONTENTS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function contents(state = [], action) {
    switch (action.type) {
        case 'CONTENTS_FETCH_DATA_SUCCESS':
            return action.contents;

        default:
            return state;
    }
}
