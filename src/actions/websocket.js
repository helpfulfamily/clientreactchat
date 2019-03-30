import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { properties } from '../config/properties.js';
import dispatcherHa from './items';
var stompClient = null;
export default function connect(store) {
    var socket = new SockJS(properties.notificationUrl);
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/pushNotification', function (notification) {
            dispatcherHa(notification, store)
        });
    });

}