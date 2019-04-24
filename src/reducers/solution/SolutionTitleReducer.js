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
       case 'TRANSACTION_SOLUTION_TITLE':{

           var transaction= action.transaction;

           var index=-1;
           const title =
               state.find(function(title) {

                   if(title.id === transaction.objectId){
                       index = state.indexOf(title);
                       return title;
                   }
               });
           if(index>-1){
               title.currentThankAmount = transaction.lastThankAmountObject;
               state[index] = title;
           }

           return [...state];

       }
        default:
            return state;
    }
}
