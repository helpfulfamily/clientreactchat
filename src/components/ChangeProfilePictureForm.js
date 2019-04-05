import React from 'react';

import {properties} from '../config/properties.js';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import axios from "axios";




export default  class ChangeProfilePictureForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePhotoUrl: ''
        };


        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmitProcess = this.handleSubmitProcess.bind(this);
    }



    handleChangeTitle(event) {
        this.setState({profilePhotoUrl: event.target.value});
    }


    handleSubmitProcess(event) {

        event.preventDefault();


        var apiBaseUrl = properties.changeProfilePhotoUrl;


        var user = {
            "username": this.props.username,
            "profilePhotoUrl": this.state.profilePhotoUrl,

        }

        var headers = {

            'Content-Type': 'application/json',

        }

        axios.post(apiBaseUrl, user,{headers: headers})

            .then( (response)  => {
                if (!response.status) {
                    throw Error(response.statusText);
                }

            })
            .catch( (error)  => {
                //  dispatch(itemsHasErrored(true));
            })
            .then( () =>  {


                //  dispatch(itemsIsLoading(false));

            });

    }

    render() {

         return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}
                   external={this.props.externalCloseBtn}>

                <ModalHeader>Change profile picture:</ModalHeader>
                <ModalBody>



                        <label>
                            You can provide a link to image you want to use:
                            <br/>

                            <input type="text" value={this.state.profilePhotoUrl} onChange={this.handleChangeTitle} />

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


