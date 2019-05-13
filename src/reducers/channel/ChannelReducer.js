export function channelHasErrored(state = false, action) {
    switch (action.type) {
        case 'CHANNEL_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function channelIsLoading(state = false, action) {
    switch (action.type) {
        case 'CHANNEL_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}
export function channel(state = {}, action) {
    switch (action.type) {
        case 'CHANNEL_CHANGED':
            return action.channel;
        case 'OBSERVATION_CHANNEL':
            var observation= action.observaton;
            var currentObserverAmount= observation.currentObserverAmount;
            state.currentObserverAmount= currentObserverAmount;
            return { ...state };
        default:
            return state;
    }
}
export function channelReducer(state = [], action) {

   switch (action.type) {
        case 'CHANNEL_FETCH_DATA_SUCCESS':{
            return action.problemTitles;

        }
       case 'TRANSACTION_CHANNEL':{

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
