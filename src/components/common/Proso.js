import React, { Component } from 'react';

import {Col, Row} from "reactstrap";
import ChannelContentList from "../channel/ChannelContentList";

import {Route, Switch} from "react-router-dom";
import {channelGetByName} from '../../actions/channel/ChannelAction';


import Responsive from 'react-responsive';

import ProsoTab from "./ProsoTab";
import { properties } from '../../config/properties.js';
import PropTypes from 'prop-types'
import {connect} from "react-redux";
 const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;


var channelName="";
class Proso extends Component {
    constructor(props) {
        super(props);
        channelName = this.props.match.params[0];
        if (typeof channelName!=="undefined" && channelName.includes("channelcontents/")) {
            channelName = channelName.replace("channelcontents/", "");

            this.props.channelChanged(properties.channel_by_name+ "/" +channelName);

        } else {
            channelName = "";
        }
    }

    componentDidUpdate(prevProps)
    {

        if (prevProps.match.params[0] !=  this.props.match.params[0]) {
            channelName = this.props.match.params[0];
            if (channelName.includes("channelcontents/")) {
                channelName = channelName.replace("channelcontents/", "");

                this.props.channelChanged(properties.channel_by_name+ "/" +channelName);

            } else {
                channelName = "";
            }
        }

    }

      render() {



        return (
            <div>

                <Desktop>
                    <Row>
                        <Col xs="6" sm="3"> <ProsoTab/> </Col>
                        <Col xs="6" sm="6">
                            <Switch>
                              <Route exact path="/channelcontents/:title" component={ChannelContentList} />
                            </Switch>
                        </Col>

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





Proso.propTypes = {

    channelChanged: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        channelChanged: (url) => {
            dispatch(channelGetByName(url))
        }

    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Proso);