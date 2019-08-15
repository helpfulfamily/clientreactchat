import {notify} from 'reapop';
import defaultavatar  from  "../../components/user/default-avatar.png";

 


// Kargo (action) nesnesi.
export function transactionChannel(transaction) {
    return {
        type: 'TRANSACTION_CHANNEL',   // Kargonun türü, başlığı
        transaction   // Kargo kutusunun içindeki şey.
    };
}

// Notification modülünden gelen Transaction-başarılı mesajını Websocket.js karşılar. Bu fonksiyona yönlendirir.
export default function dispatcherTransaction(data, store){


    var transaction=JSON.parse(data.body);
        transaction= transaction.payload;

    var objectType=transaction.objectType;

    var action;
    var notificationMessage="";


        // Şimdilik sadece Kanal için Thankcoin transferi mesajı gönsteriliyor.
        switch (objectType) {

            case 'Channel':{
                  // Kargo (action) hazırlanıyor.
                  action= transactionChannel(transaction);
                break;
            }



        }

        // Ekrana kargonun içindeki mesaj gösteriliyor.
       showNotificationForTransaction(store, notificationMessage, transaction)

       // Kargo  adrese (Reducer'a. Thankcoin için ise: ThankcoinReducer) postalanıyor.
       store.dispatch(action);


}

// Ekrana, o transaction işlemi ile ilgili notification mesajı çıkarır.
function  showNotificationForTransaction(store, notificationMessage, transaction) {
    var objectType=transaction.objectType;
    var channelName= transaction.name;


    var notificationMessage="You supported #" + channelName+ " channel!";

    switch (objectType) {
        case 'Channel':{

            var image= transaction.receiver.profilePhotoUrl;
            if(image==null){
                image=defaultavatar;
            }
            console.log(defaultavatar);

            /*
                Bunu notify kütüphanesinin kullanılma şekli olarak kabul edelim. Notify, ekrana notification gösteren kütüphanedir.
             */
            store.dispatch(   notify({
                title: "Thank you!",
                message: notificationMessage,
                image: image,
                status: "success",
                dismissible: false,
                dismissAfter: 0,
                buttons: [{
                    name: 'OK',
                    primary: true
                } ],
                allowHTML: true
            }));


            break;
        }



    }



}