export function solutionContentsHasErrored(state = false, action) {
    switch (action.type) {
        case 'SOLUTION_CONTENTS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function solutionContentsIsLoading(state = false, action) {
    switch (action.type) {
        case 'SOLUTION_CONTENTS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function solutionContentReducer(state = [], action) {
    switch (action.type) {
        case 'SOLUTION_CONTENTS_FETCH_DATA_SUCCESS':
            return action.contents;
        case 'PUBLISH_SOLUTION_CONTENT':{
            var data=action.item;
            var title= window.location.pathname;
            title = decodeURIComponent(title);
            title = title.replace("\/proso\/solutioncontents\/","")
            if(data.payload.solutionTitle.name==title){
                return   [

                    data.payload,
                    ...state,
                ]

            }else{

                return state;
            }
        }
        case 'SOLUTION_CONTENTS_APPEND_LIST_SUCCESS':{

            return   [

                 ...state,
                ...action.contents
            ]


        }
        default:
            return state;
    }

}
