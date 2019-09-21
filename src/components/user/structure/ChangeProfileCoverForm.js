import React from 'react';

import {properties} from '../../common/config/properties.js';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import axios from "axios";


export default  class ChangeProfileCoverForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            coverUrl: ''
        };


        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmitProcess = this.handleSubmitProcess.bind(this);
    }



    handleChangeTitle(event) {
        this.setState({coverUrl: event.target.value});
    }


    handleSubmitProcess(event) {

        event.preventDefault();


        var apiBaseUrl = properties.changeCoverUrl;


        var user = {
            "username": this.props.username,
            "coverUrl": this.state.coverUrl,

        };

        var headers = {

            'Content-Type': 'application/json',

        };

        axios.post(apiBaseUrl, user,{headers: headers})

            .then( (response)  => {
                if (!response.status) {
                    throw Error(response.statusText);
                }

            })
            .catch( (error)  => {

            })
            .then( () =>  {




            });

    }

    render() {

         return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}
                   external={this.props.externalCloseBtn}>

                <ModalHeader>Change cover picture:</ModalHeader>
                <ModalBody>



                        <label>
                            You can provide a link to image you want to use:
                            <br/>

                            <input type="text" value={this.state.coverUrl} onChange={this.handleChangeTitle} />

                        </label>
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


