import React from 'react';

import {properties} from '../../config/properties.js';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {publishProblem} from "../../actions/problem/ProblemTitleAction";
import {connect} from "react-redux";
import PropTypes from 'prop-types'

import draftToHtml from 'draftjs-to-html';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import familypng from "./family.png";
import {getToken} from "../common/process";
import ChannelTagComponent from "../common/ChannelTagComponent";




class CreateFamilyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:""
        };


        this.handleChangeFamily = this.handleChangeFamily.bind(this);
        this.handleSubmitProcess = this.handleSubmitProcess.bind(this);
    }




    handleChangeFamily(event) {
        this.setState({name: event.target.value});
    }


    handleSubmitProcess(event) {

        event.preventDefault();

        getToken(this.props.loginUser.sso.keycloak).then( (token) => this.startCreateFamilyProcess(token))
            .catch(function(hata){

                console.log(hata)
            });
         this.props.toggle();

    }
    startCreateFamilyProcess = (token) =>
    {

        var apiBaseUrl = properties.family_create;



        var family = {
            "name": this.state.name,
          }


        this.props.postData(apiBaseUrl, family, token);
    }

    render() {

         return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}
                   external={this.props.externalCloseBtn}>

                <ModalHeader>
                    <img src={familypng} height="54" width="54"/>  <label>  Create Family! </label>
                </ModalHeader>
                <ModalBody>


                    <label>   Family Name:  </label>
                            <br/>

                            <input type="text" size="57" value={this.state.name} onChange={this.handleChangeFamily} />

                        <br/>

                    <div >






                    </div>


                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmitProcess}>Submit</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>

            </Modal>

        );
    }
}

CreateFamilyForm.propTypes = {
    postData: PropTypes.func.isRequired,
    loginUser: PropTypes.object.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        loginUser: state.loginReducer,
        hasErrored: state.problemTitleHasErrored,
        isLoading: state.problemTitleIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        postData: (url, item, token) => {console.log(url); publishProblem(url, item, token)}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateFamilyForm);
