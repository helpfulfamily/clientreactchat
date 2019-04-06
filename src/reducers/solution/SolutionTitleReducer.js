export function solutionTitleHasErrored(state = false, action) {
    switch (action.type) {
        case 'SOLUTION_TITLE_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function solutionTitleIsLoading(state = false, action) {
    switch (action.type) {
        case 'SOLUTION_TITLE_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function solutionTitleReducer(state = [], action) {

   switch (action.type) {
        case 'SOLUTION_TITLE_FETCH_DATA_SUCCESS':
            return action.solutionTitles;

        case 'PUBLISH_SOLUTION_CONTENT':{
            var data= action.item;
            var firstContent= data.payload.firstContent;
            if(firstContent){
                return   [

                    data.payload.solutionTitle,
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
