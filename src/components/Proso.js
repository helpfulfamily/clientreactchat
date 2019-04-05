import React, { Component } from 'react';

import {Col, Row} from "reactstrap";
import ContentList from "./ContentList";

import {Route} from "react-router-dom";



import Responsive from 'react-responsive';
import ProsoTab from "./ProsoTab";

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;

export default class Proso extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div>

                <Desktop>
                    <Row>
                        <Col xs="6" sm="4"> <ProsoTab/> </Col>
                        <Col xs="6" sm="8"><Route exact path="/proso/contents/:title" component={ContentList} /></Col>
                     </Row>
                </Desktop>
                <Mobile>
                    <Row>
                      <Col><Route exact path="/proso/contents/:title" component={ContentList} /></Col>
                    </Row>
                </Mobile>
                <Tablet>
                    <Row>
                        <Col><Route exact path="/proso/contents/:title" component={ContentList} /></Col>
                    </Row>
                </Tablet>

            </div>
        );
    }
}



