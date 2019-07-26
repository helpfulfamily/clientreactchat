import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { properties } from '../config/properties.js';
import dispatcherHaProblemContent from './channel/ProblemTitleAction';
import dispatcherTransaction from './thankcoin/ThankcoinAction';
import { dispatcherChannel } from './channel/ChannelAction';
import dispatcherObservation from "./observation/ObservationAction";
import { store } from '../App'
import {dispatcherUserList} from "./user/UserAction";
 var stompClient = null;
export default function connect(username) {
    var socket = new SockJS(properties.notificationUrl);
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/pushNotificationChannelContent', function (notification) {
            dispatcherHaProblemContent(notification, store)
        });

        stompClient.subscribe("/topic/sendThankCoin", function (notification) {
            dispatcherTransaction(notification, store)
        });

        stompClient.subscribe('/topic/pushNotificationChannel', function (notification) {
            dispatcherChannel(notification, store)
        });
        stompClient.subscribe('/topic/pushNotificationUserChannelJoinPart', function (userList) {
            dispatcherUserList(userList, store);

        });


        if(typeof username!=="undefined" && username.length>0){
            stompClient.subscribe("/user/" + username+ "/queue/sendObservationRequestSignal", function (notification) {
                dispatcherObservation(notification, store)
            });
        }
    });

}