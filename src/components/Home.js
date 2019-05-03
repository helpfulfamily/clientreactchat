import React, { Component } from 'react';


import {Route, Switch} from "react-router-dom";


import Profile from "./user/Profile";
import NavbarMenu from "./common/NavbarMenu";
import Proso from "./common/Proso";
import ATopLevelComponent from "./common/ATopLevelComponent";



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
                <br/>
                <br/>


                <Switch>
                    <Route exact path="/:username" component={Profile} />
                    <Route exact  path="/*" component={Proso} />

                </Switch>
                <ATopLevelComponent/>
            </div>
        );
    }
}



