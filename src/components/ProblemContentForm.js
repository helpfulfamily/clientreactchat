import React, {Component} from 'react';
import axios from 'axios';
import {properties} from '../config/properties.js';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {itemsAddSuccess, itemsFetchData, itemsPostData} from "../actions/items";
import {connect} from "react-redux";
import PropTypes from 'prop-types'

class ProblemContentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: ''
        };

        this.handleChange = this.handleChange.bind(this);

        this.handleSubmitProcess = this.handleSubmitProcess.bind(this);
    }

    handleChange(event) {
        this.setState({content: event.target.value});
    }




    handleSubmitProcess(event) {

        event.preventDefault();


        var apiBaseUrl = properties.createTitle;


        var item = {
            "id": 0,
            "name": "",
            "text": this.state.content,
            "title": {
                "contents": [
                    null
                ],
                "id": 0,
                "name": this.props.title
            }
        }


         this.props.postData(apiBaseUrl, item);

    }

    render() {
        return (
            <div>



                <textarea value={this.state.content} onChange={this.handleChange} class="form-control"/>

                <Button color="primary" onClick={this.handleSubmitProcess}>Submit</Button>{' '}


          </div>

        );
    }
}

ProblemContentForm.propTypes = {
    postData: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProblemContentForm);