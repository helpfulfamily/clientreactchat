import React, {Component} from 'react';
import axios from 'axios';
import {properties} from '../config/properties.js';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export default class ProblemTitleForm extends React.Component {
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


        var data = {
            "id": 0,
            "name": "",
            "text": this.state.content,
            "title": {
                "contents": [
                    null
                ],
                "id": 0,
                "name": this.state.title
            }
        }


        var headers = {

            'Content-Type': 'application/json',

        }


        axios.post(apiBaseUrl, data, {headers: headers}).then( (response) =>{
            this.props.toggle();

        }).catch(function (error) {

            console.log(error);

        });


    }

    render() {
        return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}
                   external={this.props.externalCloseBtn}>

                <ModalHeader>Modal title</ModalHeader>
                <ModalBody>
                    <b>Look at the top right of the page/viewport!</b><br/>


                        <label>
                            Problem Title:
                            <br/>
                            <input type="text" value={this.state.title} onChange={this.handleChangeTitle}/>
                        </label>
                        <br/>
                        <label>
                            Content:
                            <br/>
                            <textarea value={this.state.content} onChange={this.handleChange}/>
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