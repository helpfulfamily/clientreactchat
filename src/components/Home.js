import React, { Component } from 'react';


import {Route} from "react-router-dom";


import Profile from "./Profile";
import {FaHireAHelper} from "react-icons/fa";
import NavbarHa from "./NavbarHa";
import ProblemTitleForm from "./ProblemTitleForm";
import Proso from "./Proso";


export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {modal: false };
        this.toggle = this.toggle.bind(this);
    }


    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    render() {
        const externalCloseBtn = <a className="nav-link text-white" href="#" onClick={this.toggle}><FaHireAHelper /> Ask for Help </a>;
        const buttonLabel ="Ask for Help";
       return (
            <div>
                   <NavbarHa externalCloseBtn={externalCloseBtn}/>
                   <br/>
                   <br/>
                   <Route exact  path="/proso/*" component={Proso} />
                   <Route exact path="/profile/:username" component={Profile} />
                   <ProblemTitleForm externalCloseBtn={externalCloseBtn} buttonLabel={buttonLabel} modal={this.state.modal}  toggle={this.toggle} />
            </div>
        );
    }
}



