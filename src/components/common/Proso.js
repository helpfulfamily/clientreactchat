import React, { Component } from 'react';

import {Col, Row} from "reactstrap";
import ProblemContentList from "../problem/ProblemContentList";

import {Route, Switch} from "react-router-dom";



import Responsive from 'react-responsive';
import ProsoTab from "./ProsoTab";
import SolutionContentList from "../solution/SolutionContentList";

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
                        <Col xs="6" sm="8">
                            <Switch>
                            <Route exact path="/proso/solutioncontents/:title" component={SolutionContentList} />
                            <Route exact path="/proso/problemcontents/:title" component={ProblemContentList} />
                            </Switch>
                        </Col>
                     </Row>
                </Desktop>
                <Mobile>
                    <Row>
                      <Col>
                          <Switch>
                              <Route exact path="/proso/solutioncontents/:title" component={SolutionContentList} />
                              <Route exact path="/proso/problemcontents/:title" component={ProblemContentList} />
                          </Switch>
                       </Col>
                    </Row>
                </Mobile>
                <Tablet>
                    <Row>
                        <Col>
                            <Switch>
                                <Route exact path="/proso/solutioncontents/:title" component={SolutionContentList} />
                                <Route exact path="/proso/problemcontents/:title" component={ProblemContentList} />
                            </Switch>
                         </Col>
                    </Row>
                </Tablet>

            </div>
        );
    }
}



