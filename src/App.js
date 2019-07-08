import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route} from 'react-router-dom';
import Home from './components/Home';
import 'babel-polyfill';


export const store = configureStore();
class App extends Component {
  render() {
    return (

            <Provider store={store}>

                <Route exact  path="/*" component={Home} />

            </Provider>

    );
  }
}

export default App;
