import axios from "axios";

export function searchCriteria(criteria) {
    return {
        type: 'CRITERIA_TITLE_CHANGED',
        criteria
    };
}
export function changeSearchCriteria(criteria) {
    return (dispatch) => {
          dispatch(searchCriteria(criteria));
    };
}