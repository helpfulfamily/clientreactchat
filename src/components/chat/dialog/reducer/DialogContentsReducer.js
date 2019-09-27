import {showNotificationForTransaction} from "../../../thankcoin/process/TransactionNotificationProcess";

export function dialogContentsHasErrored (state = false, action) {
    switch (action.type) {
        case 'DIALOG_CONTENTS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}


function isNeededToUpdateGui(receiverIDFromWebSocket){
    var receiverID= window.location.pathname;
    receiverID = decodeURIComponent(receiverID);
    receiverID = receiverID.replace("\/dialogcontents\/", "");
    if(receiverIDFromWebSocket==receiverID){
        return true;
    }else{
        return false;
    }
}
export function dialogContentsReducer(state = [], action) {
    switch (action.type) {

        //Dialog içerisindeki mesajları getirir.


        case 'GET_DIALOG_CONTENTS':
            return action.dialogContents;

        //Chat ekranında scroll tavana değdikçe, bir önceki 10 mesajı getiren aksiyon.
        case 'APPEND_DIALOG_CONTENTS':{

            return   [


                ...action.dialogContents,
                ...state
            ]


        }

        //Mesaj yayınlayan aksiyon.
        case 'PUBLISH_DIALOG_CONTENT':{

            if(isNeededToUpdateGui(action.content.receiverID) ){
                return   [
                    ...state,
                    action.content,

                ]

            }else{

                return state;
            }
        }

        // Bir mesaja teşekkür gönderen fonksiyon.
        case 'TRANSACTION_DIALOG_CONTENT':{

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

                showNotificationForTransaction(transaction);

                return [...state];
            }else{
                return state;
            }
        }
        default:
            return state;
    }

}
