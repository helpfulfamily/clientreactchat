import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { properties } from '../config/properties.js';
import dispatcherHaProblemContent from './problem/ProblemTitleAction';
import dispatcherHaSolutionContent from './solution/SolutionTitleAction';

var stompClient = null;
export default function connect(store) {
    var socket = new SockJS(properties.notificationUrl);
    stompClient = Stomp.over(socket);

    stompClient.connect({}, function (frame) {
        stompClient.subscribe('/topic/pushNotificationProblemContent', function (notification) {
            dispatcherHaProblemContent(notification, store)
        });
        stompClient.subscribe('/topic/pushNotificationSolutionContent', function (notification) {
            dispatcherHaSolutionContent(notification, store)
        });

    });

}