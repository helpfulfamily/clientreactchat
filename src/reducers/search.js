export function searchCriteria(state ={}, action) {
    switch (action.type) {
        case 'CRITERIA_TITLE_CHANGED':
            return action.criteria;

        default:
            return state;
    }
}
