import React from 'react';


import {Button} from "reactstrap";
import {getToken} from "../../../user/process/LoginProcess";

import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {ContentState, convertToRaw, EditorState} from "draft-js";
import '../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import {Editor} from 'react-draft-wysiwyg';
import draftToHtml from "draftjs-to-html";

import {publishDialogContentOut} from "../door/PublishDialogContentDoor";
import logger from "../../../../tools/log/index";

class DialogContentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: '',
            dialogContent: '',
            editorState: EditorState.createEmpty()
        };


        this.handleSubmitProcess = this.handleSubmitProcess.bind(this);

        this.handleKeyCommand = this.handleKeyCommand.bind(this);

    }

    onEditorStateChange = (editorState) => {

        this.setState({editorState: editorState});

        this.setState({channelContent:  draftToHtml(convertToRaw(editorState.getCurrentContent()))});


    };



    handleSubmitProcess(event) {

        if(typeof event!="undefined"){
            event.preventDefault();
        }


        getToken(this.props.loginUser.sso.keycloak).then( (token) => this.startPublishProcess(token))
            .catch(function(hata){

                logger.error(hata)
            });




    }
    startPublishProcess = (token) =>
    {

          // Allta, ChannelName yerine ne yazacağıma karar veremedim.


        var content = {
            "name": "",
            "text": this.state.dialogContent,
            "dialog": {
                "name": decodeURIComponent(this.props.channelName)
            }
        };

        this.clearForm();

        this.props.publishDialogContentOut(content, token);
    };
    handleKeyCommand(command) {
        if (command === 'split-block') {
            // Perform a request to save your contents, set
            // a new `editorState`, etc.
            this.handleSubmitProcess();
        }
        return 'not-handled';
    }


    clearForm(){
        const editorState = EditorState.push(this.state.editorState, ContentState.createFromText(''));
        this.setState({editorState: editorState});
    }
    render() {
        if((typeof this.props.loginUser.sso!=="undefined") && this.props.loginUser.sso.isAuthenticated){
            return (
                <div>


                    <Editor
                        editorState={this.state.editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onEditorStateChange={this.onEditorStateChange}
                        handleKeyCommand={this.handleKeyCommand}
                    />

                    <Button color="primary" onClick={this.handleSubmitProcess}>Publish</Button>{' '}



                    <p/>
                </div>

            );
        }else{
            return ("");
        }

    }
}

DialogContentForm.propTypes = {
    publishDialogContentOut: PropTypes.func.isRequired,
    loginUser: PropTypes.object.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        loginUser: state.userInformationReducer,
        hasErrored: state.problemTitleHasErrored,
        isLoading: state.problemTitleIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        publishDialogContentOut: (content, token) => { publishDialogContentOut(content, token)}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogContentForm);
