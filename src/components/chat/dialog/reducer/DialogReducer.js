export function dialogHasErrored(state = false, action) {
    switch (action.type) {
        case 'DIALOG_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function dialogIsLoading(state = false, action) {
    switch (action.type) {
        case 'DIALOG_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}
export function dialog(state = {}, action) {
    switch (action.type) {
        case 'DIALOG_CREATED':
            return action.dialog;
        case 'DIALOG_CHANGED':
            return action.dialog;

            return { ...state };
        default:
            return state;
    }
}
export function dialogReducer(state = [], action) {

    switch (action.type) {
        case 'DIALOG_FETCH_DATA_SUCCESS':{
            return action.dialog;

        }

        default:
            return state;
    }
}
