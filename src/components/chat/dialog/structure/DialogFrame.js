import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Button, Col, Row} from 'reactstrap';
import PropTypes from 'prop-types'

import '../style/dialogcontent.css';


import DialogContentList from "./DialogContentList";
import DialogContentForm from "./DialogContentForm";

class DialogFrame extends Component {


    constructor(props) {
        super(props);

    }


    componentDidUpdate(prevProps) {


        // Yeni bir kanala girilip girilmediği bu şekilde öğrenilir.
        if (prevProps.pathname != this.props.location.pathname) {

            var receiverID = this.props.location.pathname;
            receiverID = decodeURIComponent(receiverID);
            receiverID = receiverID.replace("\/dialogcontents\/", "");

            // Kanaldaki online kullanıcı listesini bu şekilde alır.
            // TODO

        }

    }


    partDialog(event) {
        event.preventDefault();
        var receiverID = this.props.location.pathname;
        receiverID = decodeURIComponent(receiverID);
        receiverID = receiverID.replace("\/dialogcontents\/", "");


    }


    render() {


        var buttonPartChannel = <Button color="primary" onClick={(e) => this.partDialog(e)}> Part Dialog </Button>;

        return (


            <Row>
                <Col xs="6" sm="9">
                    <b>  {decodeURIComponent(this.props.match.params.receiverID)} </b>

                    {buttonPartChannel}
                    {(typeof this.props.loginUser.sso != "undefined" && this.props.isWebSocketConnected)
                        ? <DialogContentList receiverID={this.props.match.params.receiverID}/> : ''}



                    <DialogContentForm receiverID={this.props.match.params.receiverID}/>
                </Col>

            </Row>

        );
    }
}

DialogFrame.propTypes = {

    isWebSocketConnected: PropTypes.bool.isRequired,
    loginUser: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {

        isWebSocketConnected: state.isWebSocketConnected,
        loginUser: state.userInformationReducer

    };
};


export default connect(mapStateToProps, {})(DialogFrame);
