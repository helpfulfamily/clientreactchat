import {notify} from 'reapop';
import defaultavatar  from  "../../components/user/default-avatar.png";

import { store } from '../../App'

// Ekrana, o transaction işlemi ile ilgili notification mesajı çıkarır.
var notificationMessage="";
export function  showNotificationForTransaction(transaction) {
    var objectType=transaction.objectType;
    var channelName= transaction.name;


    notificationMessage="You supported #" + channelName+ " channel!";

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