import React, { Component } from 'react';


import {Route, Switch} from "react-router-dom";


import Profile from "./Profile";
import NavbarMenu from "./NavbarMenu";
import Proso from "./Proso";



export default class Home extends Component {

    constructor(props) {
        super(props);
    }




    render() {


       return (
            <div>
                   <NavbarMenu/>
                   <br/>
                   <br/>

                <Switch>
                   <Route exact  path="/proso*" component={Proso} />
                   <Route exact path="/:username" component={Profile} />

                   </Switch>
            </div>
        );
    }
}



