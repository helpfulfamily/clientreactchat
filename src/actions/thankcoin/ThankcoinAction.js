import {notify} from 'reapop';
import {getLoginUser} from "../../components/common/LoginProcess";
import defaultavatar  from  "../../components/user/default-avatar.png";

export function transactionProblemContent(transaction) {
    return {
        type: 'TRANSACTION_PROBLEM_CONTENT',
        transaction
    };
}

export function transactionSolutionContent(transaction) {
    return {
        type: 'TRANSACTION_SOLUTION_CONTENT',
        transaction
    };
}

export function transactionProblemTitle(transaction) {
    return {
        type: 'TRANSACTION_PROBLEM_TITLE',
        transaction
    };
}
export function transactionSolutionTitle(transaction) {
    return {
        type: 'TRANSACTION_SOLUTION_TITLE',
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
            case 'ProblemContent':{

                action= transactionProblemContent(transaction);

                break;
            }
            case 'SolutionContent':{

                action= transactionSolutionContent(transaction);

                break;
            }
            case 'ProblemTitle':{

                  action= transactionProblemTitle(transaction);
                break;
            }

            case 'SolutionTitle':{

                action= transactionSolutionTitle(transaction);
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
        case 'SolutionContent':{

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

        case 'SolutionTitle':{
            if(bothSenderAndReceiver){
                notificationMessage= "You support and prioritise your own Solution Title using 1 Thankcoin";
            }else if(isSender){
                notificationMessage= "You support and prioritise Solution Title of " +receiverUsername +  " using 1 Thankcoin";
            }else if(isReceiver){
                notificationMessage= senderUsername + " support and prioritise your Solution Title using 1 Thankcoin";

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