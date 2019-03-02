import React, { Component } from 'react';
import ItemList from "./ItemList";
import {Col, Row, Button} from "reactstrap";
import ContentList from "./ContentList";
import {Route} from "react-router-dom";
import { FaHireAHelper} from 'react-icons/fa';

import NavbarHa from "./NavbarHa";
import ProblemTitleForm from "./ProblemTitleForm";


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

        const externalCloseBtn = <a className="nav-link" href="#" onClick={this.toggle}><FaHireAHelper /> Ask for Help </a>;
        const buttonLabel ="Ask for Help"
        return (
            <div>
                <NavbarHa externalCloseBtn={externalCloseBtn}/>
                <Row>
                    <Col xs="6" sm="4"><ItemList /></Col>
                    <Col xs="6" sm="8"><Route exact path="/contents/:title" component={ContentList} /></Col>
                </Row>
                <ProblemTitleForm externalCloseBtn={externalCloseBtn} buttonLabel={buttonLabel} modal={this.state.modal}  toggle={this.toggle} />
            </div>
        );
    }
}



