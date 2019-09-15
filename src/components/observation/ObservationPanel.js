import React, {Component} from 'react';
import {connect} from 'react-redux';
import {properties} from '../../config/properties.js';

import {Button} from 'reactstrap';
import {getToken} from "../common/process";
import PropTypes from 'prop-types'

import {sendObservationRequestSignal} from "../common/ObservationProcess";
import {FaEye} from "react-icons/fa";
import UserListModal from "../user/UserListModal";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import {createChannel}  from "../../actions/channel/ChannelAction";
class ObservationPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {isAlreadyObserved: ""};
    }
    componentDidMount() {
       this.setState({isAlreadyObserved: this.isAlreadyObserved(this.props.channel.name)});
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

       if((this.props.channel.name !== prevProps.channel.name) || (this.props.loginUser !== prevProps.loginUser)){
           this.setState({isAlreadyObserved: this.isAlreadyObserved(this.props.channel.name)});

       }


    }

    isAlreadyObserved(channelName) {
        var returnValue = false;
        if (typeof this.props.loginUser !== "undefined") {
            var channels = this.props.loginUser.channels;
            if (typeof channels !== "undefined") {


                var BreakException = {};

                try {
                    channels.forEach(function (channel) {
                        var name = channel.name;
                        if (channelName == name) {
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


                });


    }
    startCreateChannelProcess = (token) => {

        var apiBaseUrl = properties.channel_create;


        var channel = {
            "name": this.props.channel.name,
        }


        this.props.postData(apiBaseUrl, channel, token);
    }

    render() {
        var contextChannelNotExist = "";
        if(typeof this.props.loginUser.sso !=="undefined"){

            contextChannelNotExist = <span>
                       There is no channel named: {this.props.channel.name}
                <Button color="primary"  onClick={(e) => this.createChannel(e)}>Create </Button></span>;
        }

        var context = "";

        //TODO: If channel has no user as the creator of this channel;
        // we will suppose that this channel has not created yet.

        if (typeof this.props.channel.user != "undefined" && this.props.channel.user!=null ) {


            context = <span>  <FaEye/> {this.props.channel.currentObserverAmount} Observer(s)</span>;

            var observeOrUnobserve="";
            var isObserve = false;
            if (this.state.isAlreadyObserved) {
                observeOrUnobserve=  <span><FaEye/> Unobserve</span>;

            }else{
                observeOrUnobserve =  <span><FaEye/> Observe</span>;
                isObserve = true;
            }

            var buttonContext =<Button color="primary" onClick={(e) => this.sendObservationRequestSignal(e, isObserve)}> {observeOrUnobserve} </Button>;


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

        }else {

            context= contextChannelNotExist;

        }
        return (
            <div>


                {context}

            </div>
        )

    }
}

ObservationPanel.propTypes = {
    loginUser: PropTypes.object.isRequired,
    channel: PropTypes.object.isRequired

};

const mapStateToProps = (state) => {
    return {
        loginUser: state.userInformationReducer,
        channel: state.channel
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        postData: (url, item, token) => {

            createChannel(url, item, token)
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ObservationPanel);
