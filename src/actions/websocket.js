import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { properties } from '../config/properties.js';
import { dispatcherChannel } from './channel/ChannelAction';
import dispatcherObservation, {observationChannelAction} from "./observation/ObservationChannelAction";
import { store } from '../App'
import {dispatcherUserList} from "./user/UserAction";
import {publishChannelContentIn} from "../door/PublishChannelContentDoor";
import {transactionChannelIn} from "../door/TransactionChannelDoor";
import {transactionChannelContentIn} from "../door/TransactionChannelContentDoor";
import {observationChannelIn} from "../door/ObservationChannelDoor";
import {getLoginUser} from "../components/common/LoginProcess";
import {loginPromiseResolved} from "../components/common/ObservationProcess";
 var stompClient = null;
export default function connect(username) {
    var socket = new SockJS(properties.notificationUrl);
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/pushNotificationChannelContent', function (notification) {
            publishChannelContentIn(notification, store);
        });


       stompClient.subscribe("/topic/sendThankCoinChannel", function (data) {
               var transaction=JSON.parse(data.body);


           transactionChannelIn(transaction, store);
        });
       stompClient.subscribe("/topic/sendThankCoinChannelContent", function (data) {
           var transaction=JSON.parse(data.body);

           transactionChannelContentIn(transaction, store);
         });
        stompClient.subscribe('/topic/pushNotificationChannel', function (notification) {
            dispatcherChannel(notification, store)
        });
        stompClient.subscribe('/topic/pushNotificationUserChannelJoinPart', function (userList) {
            dispatcherUserList(userList, store);

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

                        console.log(hata)
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