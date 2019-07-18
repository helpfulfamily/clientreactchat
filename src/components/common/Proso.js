import React, { Component } from 'react';

import {Col, Row} from "reactstrap";
import ChannelContentList from "../channel/ChannelContentList";

import {Route, Switch} from "react-router-dom";


import Responsive from 'react-responsive';

import ChannelTab from "./ChannelTab";
import OnlineUserList from "../user/OnlineUserList";

 const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;


export default class Proso extends Component {
    constructor(props) {
        super(props);

    }



      render() {



        return (
            <div>

                <Desktop>
                    <Row>
                            <Col xs="6" sm="3"> <ChannelTab/> </Col>
                            <Col xs="6" sm="6">
                                <Switch>
                                    <Route exact path="/channelcontents/:title" component={ChannelContentList} />
                                </Switch>
                            </Col>
                            <Col xs="6" sm="3"> <OnlineUserList/> </Col>

                     </Row>
                </Desktop>
                <Mobile>
                    <Row>
                      <Col>
                          <Switch>
                               <Route exact path="/channelcontents/:title" component={ChannelContentList} />
                          </Switch>
                       </Col>
                    </Row>
                </Mobile>
                <Tablet>
                    <Row>
                        <Col>
                            <Switch>
                                 <Route exact path="/channelcontents/:title" component={ChannelContentList} />
                            </Switch>
                         </Col>
                    </Row>
                </Tablet>

            </div>
        );
    }
}




