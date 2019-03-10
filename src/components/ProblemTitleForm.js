import React from 'react';

import {properties} from '../config/properties.js';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {itemsPostData} from "../actions/items";
import {connect} from "react-redux";
import PropTypes from 'prop-types'

class ProblemTitleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmitProcess = this.handleSubmitProcess.bind(this);
    }

    handleChange(event) {
        this.setState({content: event.target.value});
    }

    handleChangeTitle(event) {
        this.setState({title: event.target.value});
    }


    handleSubmitProcess(event) {

        event.preventDefault();


        var apiBaseUrl = properties.createTitle;


        var item = {
            "id": 0,
            "name": "",
            "username":this.props.keycloak.idTokenParsed.preferred_username,
            "text": this.state.content,
            "title": {
                "contents": [
                    null
                ],
                "id": 0,
                "name": this.state.title
            }
        }


         this.props.postData(apiBaseUrl, item);

    }

    render() {
         return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}
                   external={this.props.externalCloseBtn}>

                <ModalHeader>Ask for Help!</ModalHeader>
                <ModalBody>
                    <b>Do not hesitate to create a problem title. Helpful Army will help you.</b><br/>


                        <label>
                            Problem Title:
                            <br/>
                            <input type="text" value={this.state.title} onChange={this.handleChangeTitle} className="form-control"/>
                        </label>
                        <br/>
                        <label>
                            Content:
                            <br/>
                            <textarea value={this.state.content} onChange={this.handleChange} />
                        </label>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.handleSubmitProcess}>Submit</Button>{' '}
                    <Button color="secondary" onClick={this.props.toggle}>Cancel</Button>
                </ModalFooter>


            </Modal>

        );
    }
}

ProblemTitleForm.propTypes = {
    postData: PropTypes.func.isRequired,
    keycloak: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        keycloak: state.loginReducer,
        item: state.item,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        postData: (url, item) => {console.log(url); dispatch(itemsPostData(url, item))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemTitleForm);
