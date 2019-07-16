import {notify} from 'reapop';
import {getLoginUser} from "../../components/common/LoginProcess";
import defaultavatar  from  "../../components/user/default-avatar.png";

 



export function transactionChannel(transaction) {
    return {
        type: 'TRANSACTION_CHANNEL',
        transaction
    };
}


export default function dispatcherTransaction(data, store){


    var transaction=JSON.parse(data.body);
        transaction= transaction.payload;

    var objectType=transaction.objectType;

    var action;
    var notificationMessage="";



        switch (objectType) {

            case 'Channel':{

                  action= transactionChannel(transaction);
                break;
            }



        }

    getLoginUser().then( (loginUser) => loginPromiseResolved(loginUser, store, notificationMessage, transaction))
        .catch(function(hata){

        console.log(hata)
    });


       store.dispatch(action);


}
function isSenderUser(loginUsername, senderUsername){
    if(loginUsername=== senderUsername){
        return true;
    }
}
function isReceiverUser(loginUsername, receiverUsername){
    if(loginUsername=== receiverUsername){
        return true;
    }
}

function  loginPromiseResolved(loginUser, store, notificationMessage, transaction) {
    var objectType=transaction.objectType;
    var senderUsername= transaction.sender.username;
    var receiverUsername=  transaction.receiver.username;

    var isSender=  isSenderUser(loginUser.sso.username, senderUsername);
    var isReceiver= isReceiverUser(loginUser.sso.username, receiverUsername);
    var bothSenderAndReceiver= isSender && isReceiver;


    var notificationMessage="";

    switch (objectType) {
        case 'ProblemContent':{


            if(bothSenderAndReceiver){

                notificationMessage= "You support and prioritise your own answer using 1 Thankcoin";
            }else if(isSender){
                notificationMessage= "You support and prioritise answer of " +receiverUsername +  " using 1 Thankcoin";
            }else if(isReceiver){
                notificationMessage= senderUsername + " support and prioritise your answer using 1 Thankcoin";

            }
            break;
        }

        case 'ProblemTitle':{
            if(bothSenderAndReceiver){
                notificationMessage= "You support and prioritise your own Problem Title using 1 Thankcoin";
            }else if(isSender){
                notificationMessage= "You support and prioritise Problem Title of " +receiverUsername +  " using 1 Thankcoin";
            }else if(isReceiver){
                notificationMessage= senderUsername + " support and prioritise your Problem Title using 1 Thankcoin";

            }

            break;
        }


    }
    var image= transaction.receiver.profilePhotoUrl;
    if(image==null){
        image=defaultavatar;
    }
    console.log(defaultavatar);
    if(loginUser!=null){

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


    }
}