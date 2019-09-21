import React, {Component} from 'react';
import {connect} from 'react-redux';
import {channelContentsAppendList} from '../action/ChannelContentAction';
import {Button, Col, Row} from 'reactstrap';
import PropTypes from 'prop-types'
import ChannelContentForm from "./ChannelContentForm";

import {Editor} from 'react-draft-wysiwyg';
import '../style/channelcontent.css';
import ObservationPanel from "../../../observation/structure/ObservationPanel";

import {getOnlineUserList} from "./OnlineUserUtil";
import OnlineUserList from ".//OnlineUserList";
import ChannelContentList from "./ChannelContentList";

class ChannelFrame extends Component {



    constructor(props) {
        super(props);

    }



    componentDidUpdate(prevProps) {



        // Yeni bir kanala girilip girilmediği bu şekilde öğrenilir.
        if (prevProps.pathname != this.props.location.pathname) {

            var channelName= this.props.location.pathname;
            channelName = decodeURIComponent(channelName);
            channelName = channelName.replace("\/channelcontents\/", "");

            // Kanaldaki online kullanıcı listesini bu şekilde alır.
            getOnlineUserList(this.props.loginUser.sso.username,"join", channelName);


        }

    }






    partChannel(event) {
        event.preventDefault();
        var channelName= this.props.location.pathname;
        channelName = decodeURIComponent(channelName);
        channelName = channelName.replace("\/channelcontents\/", "");

        // Kanaldaki online kullanıcı listesini bu şekilde alır.
        getOnlineUserList(this.props.loginUser.sso.username,"part", channelName);

    }


    render() {


        var buttonPartChannel =<Button color="primary" onClick={(e) => this.partChannel(e)}> Part Channel </Button>;





        return (


                <Row>
                    <Col xs="6" sm="9">
                        <ObservationPanel/>
                        <b>  {decodeURIComponent(this.props.match.params.title)} </b>
                        {buttonPartChannel}
                         <ChannelContentList title={this.props.match.params.title} />

                        <ChannelContentForm channelName={this.props.match.params.title}/>
                    </Col>

                    <Col xs="2" sm="3">
                        { (typeof this.props.loginUser.sso!="undefined" &&  this.props.isWebSocketConnected)  ?  <OnlineUserList/> : ''}

                    </Col>


                </Row>

        );
    }
}

ChannelFrame.propTypes = {

    isWebSocketConnected: PropTypes.bool.isRequired,
    loginUser: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {

        isWebSocketConnected: state.isWebSocketConnected,
        loginUser: state.userInformationReducer

    };
};



export default connect(mapStateToProps, {})(ChannelFrame);
