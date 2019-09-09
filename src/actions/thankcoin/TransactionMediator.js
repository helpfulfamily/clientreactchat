import {transactionChannelContentIn} from "../../door/TransactionChannelContentDoor";
import {transactionChannelIn} from "../../door/TransactionChannelDoor";

 


// Notification modülünden gelen Transaction-başarılı mesajını Websocket.js karşılar. Bu fonksiyona yönlendirir.
export default function dispatcherTransaction(data, store){


    var transaction=JSON.parse(data.body);
        transaction= transaction.payload;

    var objectType=transaction.objectType;

    var action;



         switch (objectType) {

            case 'Channel':{
                  // Kargo (action) hazırlanıyor.
                  action= transactionChannelIn(transaction, store);

                break;
            }

            case 'ChannelContent':{
                // Kargo (action) hazırlanıyor.
                action= transactionChannelContentIn(transaction, store);

                break;
            }

        }






}


