export function channelContentsHasErrored(state = false, action) {
    switch (action.type) {
        case 'CHANNEL_CONTENTS_HAS_ERRORED':
            return action.hasErrored;

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
export function channelContentsReducer(state = [], action) {
    switch (action.type) {
        //O kanala ait mesajları getiren aksiyon.
        case 'GET_CHANNEL_CONTENTS':
            return action.contents;

        //Kanalda scroll tavana değdikçe, bir önceki 10 mesajı getiren aksiyon.
        case 'APPEND_CHANNEL_CONTENTS':{

            return   [


                ...action.contents,
                ...state
            ]


        }

        //Kanala mesaj yayınlayan aksiyon.
        case 'PUBLISH_CHANNEL_CONTENT':{

           if(isNeededToUpdateGui(action.content.channel.name) ){
                return   [
                    ...state,
                    action.content,

                ]

            }else{

                return state;
            }
        }

        // Kanaldaki bir mesaja teşekkür gönderen fonksiyon.
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
