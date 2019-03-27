import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';

import dispatcherHa from './items';
var stompClient = null;
export default function connect() {
    var socket = new SockJS('https://localhost:8082/websocket');
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/pushNotification', function (notification) {
            dispatcherHa(notification)
        });
    });

}