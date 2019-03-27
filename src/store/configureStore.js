import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import connect from '../actions/websocket.js';
export default function configureStore(initialState) {
    connect();
    return createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
}
