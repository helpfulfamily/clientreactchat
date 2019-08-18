import {transactionChannel} from "./TransactionChannelAction";

 


// Notification modülünden gelen Transaction-başarılı mesajını Websocket.js karşılar. Bu fonksiyona yönlendirir.
export default function dispatcherTransaction(data, store){


    var transaction=JSON.parse(data.body);
        transaction= transaction.payload;

    var objectType=transaction.objectType;

    var action;



        // Şimdilik sadece Kanal için Thankcoin transferi mesajı gönsteriliyor.
        switch (objectType) {

            case 'Channel':{
                  // Kargo (action) hazırlanıyor.
                  action= transactionChannel(transaction);
                break;
            }



        }



       // Kargo  adrese (Reducer'a. Thankcoin için ise: ThankcoinReducer) postalanıyor.
       store.dispatch(action);


}


