import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import connect from '../actions/websocket.js';
export default function configureStore(initialState) {

    var store= createStore(
        rootReducer,
        initialState,
        applyMiddleware(thunk)
    );
    connect(store);
    return store;
}
