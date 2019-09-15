import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { properties } from '../config/properties.js';
import { dispatcherChannel } from './channel/ChannelAction';

import { store } from '../App'
import {dispatcherUserList} from "./user/UserAction";
import {publishChannelContentIn} from "../door/PublishChannelContentDoor";
import {transactionChannelIn} from "../door/TransactionChannelDoor";
import {transactionChannelContentIn} from "../door/TransactionChannelContentDoor";
import {observationChannelIn} from "../door/ObservationChannelDoor";
import {getLoginUser} from "../components/common/LoginProcess";
import {loginPromiseResolved} from "../components/common/ObservationProcess";
import logger from "../tools/log/index";

 var stompClient = null;
export default function connect(username) {
    var socket = new SockJS(properties.notificationUrl);
    stompClient = Stomp.over(socket);
    const logInformation="A message arrived to this Websocket address:";

    stompClient.connect({}, function () {
        stompClient.subscribe('/topic/pushNotificationChannelContent', function (message) {
            logger.debug(logInformation, "/topic/pushNotificationChannelContent", message);
            publishChannelContentIn(message, store);

        });


       stompClient.subscribe("/topic/sendThankCoinChannel", function (message) {

           logger.debug(logInformation, "/topic/sendThankCoinChannel", message);

           var transaction=JSON.parse(message.body);


           transactionChannelIn(transaction, store);
        });

       stompClient.subscribe("/topic/sendThankCoinChannelContent", function (message) {
           logger.debug(logInformation, "/topic/sendThankCoinChannelContent", message);

           var transaction=JSON.parse(message.body);

           transactionChannelContentIn(transaction, store);
         });
        stompClient.subscribe('/topic/pushNotificationChannel', function (message) {
            logger.debug(logInformation, "/topic/pushNotificationChannel", message);

            dispatcherChannel(message, store)
        });
        stompClient.subscribe('/topic/pushNotificationUserChannelJoinPart', function (message) {
            logger.debug(logInformation, "/topic/pushNotificationUserChannelJoinPart", message);

            dispatcherUserList(message, store);

        });


        if(typeof username!=="undefined" && username.length>0){
            stompClient.subscribe("/user/" + username+ "/queue/sendObservationRequestSignal", function (notification) {

                var observation=JSON.parse(notification.body);
                observation= observation.payload;

                var objectType=observation.objectType;

                var action;
                var notificationMessage="";



                switch (objectType) {
                    case 'Channel':{

                        action= observationChannelIn(observation);
                        store.dispatch(action)
                        break;
                    }
                }

                getLoginUser().then( (loginUser) => loginPromiseResolved(loginUser, store, notificationMessage, observation))
                    .catch(function(hata){

                        logger.error(hata)
                    });


            });
        }

        store.dispatch(isWebSocketConnected(true))

    });

}


export function isWebSocketConnected(isWebSocketConnected) {
    return {
        type: 'IS_WEBSOCKET_CONNECTED',
        isWebSocketConnected
    };
}