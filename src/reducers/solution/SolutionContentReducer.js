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
function isNeededToUpdateGui(titleFromWebSocket){
    var title= window.location.pathname;
    title = decodeURIComponent(title);
    title = title.replace("\/solutioncontents\/","")
    if(titleFromWebSocket==title){
        return true;
    }else{
        return false;
    }
}
export function solutionContentReducer(state = [], action) {
    switch (action.type) {
        case 'SOLUTION_CONTENTS_FETCH_DATA_SUCCESS':
            return action.contents;
        case 'PUBLISH_SOLUTION_CONTENT':{
            var data=action.item;

            if(isNeededToUpdateGui(data.payload.solutionTitle.name) ){
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
        case 'TRANSACTION_SOLUTION_CONTENT':{

            var transaction= action.transaction;
            if(isNeededToUpdateGui(transaction.name) ) {
                var index = -1;
                const content =
                    state.find(function (content) {

                        if (content.id === transaction.objectId) {
                            index = state.indexOf(content);
                            return content;
                        }
                    });
                if (index > -1) {
                    content.currentThankAmount = transaction.lastThankAmountObject;
                    state[index] = content;
                }

                return [...state];
            }else{
                return state;
            }
        }
        default:
            return state;
    }

}
