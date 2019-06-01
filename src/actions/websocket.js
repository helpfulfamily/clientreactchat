import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { properties } from '../config/properties.js';
import dispatcherHaProblemContent from './channel/ProblemTitleAction';
import dispatcherTransaction from './thankcoin/ThankcoinAction';

import { store } from '../App'
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


    });

}