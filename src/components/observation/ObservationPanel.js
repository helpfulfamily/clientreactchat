import React, {Component} from 'react';
import {connect} from 'react-redux';
import {properties} from '../../config/properties.js';

import {Button} from 'reactstrap';
import {getToken} from "../common/process";
import PropTypes from 'prop-types'

import {sendObservationRequestSignal} from "../common/process";
import {FaEye} from "react-icons/fa";
import UserListModal from "../user/UserListModal";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import {createChannel}  from "../../actions/channel/ChannelAction";

class ObservationPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {isAlreadyMember: ""};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if (typeof this.props.channel !== "undefined" && typeof prevProps.channel !== "undefined" && this.props.channel !== prevProps.channel) {
            this.setState({isAlreadyMember: this.isAlreadyMember(this.props.channel)});
        }
    }

    isAlreadyMember(channelProp) {
        var returnValue = false;
        if (typeof this.props.loginUser !== "undefined") {
            var channels = this.props.loginUser.channels;
            if (typeof channels !== "undefined") {


                var BreakException = {};

                try {
                    channels.forEach(function (channel) {
                        var name = channel.name;
                        if (typeof channelProp !== "undefined"
                            && channelProp.name == name) {
                            throw BreakException;
                        }

                    });
                } catch (e) {
                    if (e === BreakException) {
                        returnValue = true;
                    }
                }


            }
        }

        return returnValue;
    }

    getObservation(observe) {

        var observation = {
            objectType: "Channel",
            channelId: this.props.channel.id,
            channelName: this.props.channel.name,
            observe: observe
        }
        return observation;

    }

    sendObservationRequestSignal(event, observe) {
        event.preventDefault();

        sendObservationRequestSignal(this.props.loginUser.sso.keycloak, this.getObservation(observe));
    }

    createChannel(event) {
        event.preventDefault();


            getToken(this.props.loginUser.sso.keycloak).then((token) => this.startCreateChannelProcess(token))
                .catch(function (hata) {

                    console.log(hata)
                });


    }
    startCreateChannelProcess = (token) => {

        var apiBaseUrl = properties.channel_create;


        var channel = {
            "name": this.props.channelName,
        }


        this.props.postData(apiBaseUrl, channel, token);
    }

    render() {
        var contextChannelNotExist = "st";
        if(typeof this.props.loginUser.sso !=="undefined"){

            contextChannelNotExist = <span>
                       There is no channel named: {this.props.channelName}
                <Button color="primary"  onClick={(e) => this.createChannel(e)}>Create </Button></span>;
        }

        var context = "";
        if (typeof this.props.channel.user == "undefined") {
            context= contextChannelNotExist;

        } else {

            context = <span>  <FaEye/> {this.props.channel.currentObserverAmount} Observer(s)</span>;
            var buttonContext = <Button color="primary" onClick={(e) => this.sendObservationRequestSignal(e, true)}>
                <FaEye/> Observe </Button>;

            if (this.state.isAlreadyMember) {
                buttonContext = <Button color="primary" onClick={(e) => this.sendObservationRequestSignal(e, false)}>
                    <FaEye/> Unobserve </Button>
            }

            if (typeof this.props.loginUser.sso !== "undefined") {
                context = <Row>
                    <Col xs="3">
                        <UserListModal currentObserverAmount={this.props.channel.currentObserverAmount}/>

                    </Col>
                    <Col xs="9">
                        {buttonContext}

                    </Col>
                </Row>
                ;

            }

        }
        return (
            <div>


                {context}

            </div>
        )

    }
}

ObservationPanel.propTypes = {
    loginUser: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        loginUser: state.loginReducer

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        postData: (url, item, token) => {
            console.log(url);
            createChannel(url, item, token)
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ObservationPanel);
