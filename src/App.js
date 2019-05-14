import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './components/Home';
import 'babel-polyfill';


export const store = configureStore();
class App extends Component {
  render() {
    return (
        <Router>
            <Provider store={store}>


                <Home/>
            </Provider>
        </Router>
    );
  }
}

export default App;
