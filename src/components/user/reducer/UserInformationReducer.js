import {showNotificationForTransaction} from "../../thankcoin/process/TransactionNotificationProcess";

export function userInformationReducer(userState = {}, action) {
    switch (action.type) {

        case 'GET_USER_INFORMATION':
            if (typeof action.user !== 'undefined'){

                return action.user;
            }else{
                return userState;
            }

            return { ...userState };

        case 'TRANSACTION_CHANNEL':{


            var user= userState;

            if (typeof  user.channels == 'undefined'){
                user.channels={};
            }


            var transaction= action.transaction;

            var index=-1;
            const channel =
                user.channels.find(function(channel) {

                    if(channel.id === transaction.objectId){
                        index = user.channels.indexOf(channel);
                        return channel;
                    }
                });
            if(index>-1){
                channel.currentThankAmount = transaction.lastThankAmountObject;
                user.channels[index] = channel;
            }
            // Ekrana kargonun içindeki mesaj gösteriliyor.
            showNotificationForTransaction(transaction);
            return {...user};

        }

        case 'OBSERVATION_CHANNEL':

                var user= userState;
                var observe= action.observation.observe;
                var channelName=  action.observation.channelName;
                var channelId=-1;
                if (typeof  user.channels == 'undefined'){
                    user.channels={};
                }

                if(observe){
                    action={id: action.observation.channelId,
                        name: channelName};

                    user.channels.push(action);
                }else{

                    if (typeof user.channels !== "undefined") {

                        var filtered = user.channels.filter(function(value, index, arr){

                            return value.name !== channelName;

                        });


                        user.channels= filtered;


                    }

                }


                return {...user};

        default:
            return userState;
    }
}


