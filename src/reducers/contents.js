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
        case 'CONTENT_ADD_SUCCESS':{
            var data=action.item;
            var title= window.location.pathname;
            title = decodeURIComponent(title);
            title = title.replace("\/contents\/","")
            if(data.payload.title.name==title){
                return   [

                    data.payload,
                    ...state,
                ]

            }else{

                return state;
            }
        }
        case 'CONTENTS_APPEND_LIST_SUCCESS':{

            return   [

                 ...state,
                ...action.contents
            ]


        }
        default:
            return state;
    }

}
