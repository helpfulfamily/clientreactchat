export function channelContentsHasErrored(state = false, action) {
    switch (action.type) {
        case 'CHANNEL_CONTENTS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function channelContentsIsLoading(state = false, action) {
    switch (action.type) {
        case 'CHANNEL_CONTENTS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}
function isNeededToUpdateGui(titleFromWebSocket){
    var title= window.location.pathname;
    title = decodeURIComponent(title);
    title = title.replace("\/channelcontents\/","")
    if(titleFromWebSocket==title){
        return true;
    }else{
        return false;
    }
}
export function channelContentReducer(state = [], action) {
    switch (action.type) {
        case 'CHANNEL_CONTENTS_FETCH_DATA_SUCCESS':
            return action.contents;
        case 'PUBLISH_CHANNEL_CONTENT':{
            var data=action.item;
           if(isNeededToUpdateGui(data.payload.channel.name) ){
                return   [
                    ...state,
                    data.payload,

                ]

            }else{

                return state;
            }
        }
        case 'CHANNEL_CONTENTS_APPEND_LIST_SUCCESS':{

            return   [


                ...action.contents,
                ...state
            ]


        }

        case 'TRANSACTION_CHANNEL_CONTENT':{

            var transaction= action.transaction;
            if(isNeededToUpdateGui(transaction.name) ) {
            var index=-1;
            const content =
            state.find(function(content) {

               if(content.id === transaction.objectId){
                   index = state.indexOf(content);
                   return content;
               }
            });
            if(index>-1){
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
