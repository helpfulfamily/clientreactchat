import React, { Component } from 'react';

import {Col, Row} from "reactstrap";
import ProblemContentList from "../problem/ProblemContentList";

import {Route, Switch} from "react-router-dom";

import {channelGetByName} from '../../actions/channel/ChannelAction';
import PropTypes from 'prop-types'


import Responsive from 'react-responsive';

import SolutionContentList from "../solution/SolutionContentList";
import ProsoTab from "./ProsoTab";
import ChannelList from "../channel/ChannelList";
import {connect} from "react-redux";
import ChannelInfo from "../channel/ChannelInfo";
import { properties } from '../../config/properties.js';
const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;
var channelName="";
  class Proso extends Component {
    constructor(props) {
        super(props);
        channelName = this.props.match.params[0];
        if (typeof channelName!=="undefined" && channelName.includes("channel/")) {
            channelName = channelName.replace("channel/", "");

            this.props.channelChanged(properties.channel_by_name+ "/" +channelName);

        } else {
            channelName = "";
        }
    }

    componentDidUpdate(prevProps)
    {

        if (prevProps.match.params[0] !=  this.props.match.params[0]) {
            channelName = this.props.match.params[0];
            if (channelName.includes("channel/")) {
                channelName = channelName.replace("channel/", "");

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
                            <Route exact path="/channel/:channelName" component={ChannelInfo} />
                            <Route exact path="/solutioncontents/:title" component={SolutionContentList} />
                            <Route exact path="/problemcontents/:title" component={ProblemContentList} />
                            </Switch>
                        </Col>

                        <Col xs="6" sm="3"> <ChannelList/> </Col>
                     </Row>
                </Desktop>
                <Mobile>
                    <Row>
                      <Col>
                          <Switch>
                              <Route exact path="/solutioncontents/:title" component={SolutionContentList} />
                              <Route exact path="/problemcontents/:title" component={ProblemContentList} />
                          </Switch>
                       </Col>
                    </Row>
                </Mobile>
                <Tablet>
                    <Row>
                        <Col>
                            <Switch>
                                <Route exact path="/solutioncontents/:title" component={SolutionContentList} />
                                <Route exact path="/problemcontents/:title" component={ProblemContentList} />
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