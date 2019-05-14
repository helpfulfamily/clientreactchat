import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { properties } from '../config/properties.js';
import dispatcherHaProblemContent from './problem/ProblemTitleAction';
import dispatcherHaSolutionContent from './solution/SolutionTitleAction';
import dispatcherTransaction from './thankcoin/ThankcoinAction';
import dispatcherObservation from "./observation/ObservationAction";

import { store } from '../App'
var stompClient = null;
export default function connect(username) {
    var socket = new SockJS(properties.notificationUrl);
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/pushNotificationProblemContent', function (notification) {
            dispatcherHaProblemContent(notification, store)
        });
        stompClient.subscribe('/topic/pushNotificationSolutionContent', function (notification) {
            dispatcherHaSolutionContent(notification, store)
        });
        stompClient.subscribe("/topic/sendThankCoin", function (notification) {
            dispatcherTransaction(notification, store)
        });
        if(typeof username!=="undefined" && username.length>0){
            stompClient.subscribe("/user/" + username+ "/queue/sendObservationRequestSignal", function (notification) {
                dispatcherObservation(notification, store)
            });
        }

    });

}