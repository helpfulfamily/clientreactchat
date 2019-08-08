
export function  isWebSocketConnected(state = false, action)  {
    switch (action.type) {
        case 'IS_WEBSOCKET_CONNECTED':
            return action.isWebSocketConnected;

        default:
            return state;
    }
}