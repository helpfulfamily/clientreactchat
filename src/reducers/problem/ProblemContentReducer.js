export function problemContentsHasErrored(state = false, action) {
    switch (action.type) {
        case 'PROBLEM_CONTENTS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function problemContentsIsLoading(state = false, action) {
    switch (action.type) {
        case 'PROBLEM_CONTENTS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function problemContentReducer(state = [], action) {
    switch (action.type) {
        case 'PROBLEM_CONTENTS_FETCH_DATA_SUCCESS':
            return action.contents;
        case 'PUBLISH_PROBLEM_CONTENT':{
            var data=action.item;
            var title= window.location.pathname;
            title = decodeURIComponent(title);
            title = title.replace("\/proso\/problemcontents\/","")
            if(data.payload.problemTitle.name==title){
                return   [

                    data.payload,
                    ...state,
                ]

            }else{

                return state;
            }
        }
        case 'PROBLEM_CONTENTS_APPEND_LIST_SUCCESS':{

            return   [

                 ...state,
                ...action.contents
            ]


        }
        default:
            return state;
    }

}
