import React, { Component } from 'react';


import {Route, Switch} from "react-router-dom";


import Profile from "./user/Profile";
import NavbarMenu from "./common/NavbarMenu";
import Proso from "./common/Proso";



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



