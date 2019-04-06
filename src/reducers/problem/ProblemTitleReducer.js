export function problemTitleHasErrored(state = false, action) {
    switch (action.type) {
        case 'PROBLEM_TITLE_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function problemTitleIsLoading(state = false, action) {
    switch (action.type) {
        case 'PROBLEM_TITLE_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function problemTitleReducer(state = [], action) {

   switch (action.type) {
        case 'PROBLEM_TITLE_FETCH_DATA_SUCCESS':
            return action.problemTitles;

        case 'PUBLISH_PROBLEM_CONTENT':{
            var data= action.item;
            var firstContent= data.payload.firstContent;
            if(firstContent){
                return   [

                    data.payload.problemTitle,
                    ...state,
                ]

            }else{
                return state;
            }
        }
        default:
            return state;
    }
}
