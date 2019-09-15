import React, { Component } from 'react';

import {Col, Row} from "reactstrap";


import {Route, Switch} from "react-router-dom";

import logger from "../../tools/log/index";

import Responsive from 'react-responsive';

import ChannelTab from "./ChannelTab";
import ChannelFrame from "../channel/ChannelFrame";


 const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;


export default class MainFrame extends Component {
    constructor(props) {
        super(props);

    }



      render() {

          if (this.props.toLocaleString()) {
              logger.error("Sorry! There was an error loading the contents")
          }


        return (
            <div>

                <Desktop>
                    <Row>
                            <Col xs="6" sm="3"> <ChannelTab/> </Col>
                            <Col xs="6" sm="6">
                                <Switch>
                                    <Route exact path="/channelcontents/:title" component={ChannelFrame} />
                                </Switch>
                            </Col>


                     </Row>
                </Desktop>
                <Mobile>
                    <Row>
                      <Col>
                          <Switch>
                               <Route exact path="/channelcontents/:title" component={ChannelFrame} />
                          </Switch>
                       </Col>
                    </Row>
                </Mobile>
                <Tablet>
                    <Row>
                        <Col>
                            <Switch>
                                 <Route exact path="/channelcontents/:title" component={ChannelFrame} />
                            </Switch>
                         </Col>
                    </Row>
                </Tablet>

            </div>
        );
    }
}




