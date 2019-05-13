import React, { Component } from 'react';
import { connect } from 'react-redux';

import {Button} from 'reactstrap';

import PropTypes from 'prop-types'

import {sendObservationRequestSignal}   from "../common/process";
import {FaEye} from "react-icons/fa";
import UserListModal from "../user/UserListModal";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";

class ObservationPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {isAlreadyMember: ""};
    }
    componentDidMount() {

        this.setState( {isAlreadyMember:  this.isAlreadyMember(this.props.channel)});
    }

    isAlreadyMember(channelProp) {
        if(typeof  this.props.loginUser !=="undefined"){
            var channels= this.props.loginUser.channels;
            if(typeof  channels !=="undefined"){
                channels.forEach(function(channel) {
                    var name= channel.name;
                    if(typeof channelProp!=="undefined"
                        && channelProp.name==name){
                        return true;
                    }

                });
            }
        }
        return false;

    }
    getObservation()
    {

        var observation = {
            objectType:"Channel",
            channelId:this.props.channel.id,
            channelName:this.props.channel.name

        }
        return observation;

    }
    sendObservationRequestSignal(event)
    {
        event.preventDefault();

        sendObservationRequestSignal(this.props.loginUser.sso.keycloak, this.getObservation());
    }
    render() {
        var context= <span>  <FaEye/>  {this.props.currentObserverAmount} Observer(s)</span>;
        var buttonContext=  <Button color="primary" onClick= {(e) => this.sendObservationRequestSignal(e)} >
            <FaEye/> Observe </Button>;

        if(this.state.isAlreadyMember){
            buttonContext=  <Button color="primary" onClick= {(e) => this.sendObservationRequestSignal(e)} >
                <FaEye/> Unobserve </Button>
        }

        if(typeof this.props.loginUser.sso !== "undefined"){
            context=        <Row>
                            <Col xs="3">
                                <UserListModal currentObserverAmount= {this.props.channel.currentObserverAmount} />

                            </Col>
                            <Col xs="9">
                                { buttonContext }
                                 
                            </Col>
                           </Row>
         ;

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



export default connect(mapStateToProps, null)(ObservationPanel);
