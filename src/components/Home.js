import React, { Component } from 'react';
import ItemList from "./ItemList";
import ProblemTitleForm from "./ProblemTitleForm";
import {Col, Row, Button} from "reactstrap";
import ContentList from "./ContentList";
import {Route} from "react-router-dom";
import { FaHireAHelper} from 'react-icons/fa';

import * as Keycloak from "keycloak-js";
import ModalExample from "./ModalExample";
import NavbarHa from "./NavbarHa";
 const keycloak = Keycloak('/keycloak.json');

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { keycloak: null, authenticated: false, modal: false };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {

        // Flow can be changed to 'implicit' or 'hybrid', but then client must enable implicit flow in admin console too
        var initOptions = {
            responseMode: 'fragment',
            flow: 'standard'
        };
        keycloak.init(initOptions).success((authenticated)=>{
            this.setState({ keycloak: keycloak, authenticated: authenticated })
        }).error(function() {
            console.log('failed to initialize');
        });

    }
    handleLogin(e) {
        e.preventDefault();

        keycloak.login();

    }
    handleLogout(e) {
        e.preventDefault();

        keycloak.logout();
    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    render() {

        const externalCloseBtn = <a className="nav-link" href="#" onClick={this.toggle}>Ask for Help <FaHireAHelper /></a>;
        const buttonLabel ="Ask for Help"

         if(this.state.keycloak) {
             if(this.state.authenticated) return (
                 <div>
                     <button onClick={this.handleLogout}>Logout</button>
                     <Row>
                         <Col><ProblemTitleForm/></Col>
                     </Row>
                     <Row>
                         <Col xs="6" sm="4"><ItemList /></Col>
                         <Col xs="6" sm="8"><Route exact path="/contents/:title" component={ContentList} /></Col>
                     </Row>

                 </div>
             ); else return (
                 <div>
                     <NavbarHa externalCloseBtn={externalCloseBtn}/>
                     <button onClick={this.handleLogin}>Login</button>
                       <Row>
                         <Col xs="6" sm="4"><ItemList /></Col>
                         <Col xs="6" sm="8"><Route exact path="/contents/:title" component={ContentList} /></Col>
                     </Row>


                     <ModalExample externalCloseBtn={externalCloseBtn} buttonLabel={buttonLabel} modal={this.state.modal}  toggle={this.toggle} />
                 </div>
             )
         }
        return (
            <div>Initializing Keycloak...</div>
        );
    }
}



