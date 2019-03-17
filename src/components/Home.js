import React, { Component } from 'react';
import ItemList from "./ItemList";
import {Col, Row, Button} from "reactstrap";
import ContentList from "./ContentList";
import {Route} from "react-router-dom";
import { FaHireAHelper} from 'react-icons/fa';

import NavbarHa from "./NavbarHa";
import ProblemTitleForm from "./ProblemTitleForm";
import Responsive from 'react-responsive';

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

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
                <Desktop>
                    <Row>
                        <Col xs="6" sm="4"><ItemList /></Col>
                        <Col xs="6" sm="8"><Route exact path="/contents/:title" component={ContentList} /></Col>
                    </Row>
                </Desktop>
                <Mobile>
                    <Row>
                      <Col><Route exact path="/contents/:title" component={ContentList} /></Col>
                    </Row>
                </Mobile>
                <Tablet>
                    <Row>
                        <Col><Route exact path="/contents/:title" component={ContentList} /></Col>
                    </Row>
                </Tablet>
                <ProblemTitleForm externalCloseBtn={externalCloseBtn} buttonLabel={buttonLabel} modal={this.state.modal}  toggle={this.toggle} />
            </div>
        );
    }
}



