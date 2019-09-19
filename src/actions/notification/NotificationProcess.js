import {toast } from 'react-toastify';


// Ekrana, o transaction işlemi ile ilgili notification mesajı çıkarır.
var notificationMessage="";
export function  showNotificationForTransaction(transaction) {
    var objectType=transaction.objectType;
    var channelName= transaction.name;
    var image= transaction.receiver.profilePhotoUrl;



    switch (objectType) {
        case 'Channel':{
            notificationMessage="You supported #" + channelName+ " channel!";
            /*
                Bunu notify kütüphanesinin kullanılma şekli olarak kabul edelim. Notify, ekrana notification gösteren kütüphanedir.
             */


            toast(notificationMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            break;
        }
        case 'ChannelContent':{

            notificationMessage="You send Thankcoin for a message of " + transaction.receiver.username;
            toast(notificationMessage, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });


            break;
        }


    }



}