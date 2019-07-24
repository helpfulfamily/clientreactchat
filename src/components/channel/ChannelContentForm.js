import React from 'react';

import {properties} from '../../config/properties.js';
import {Button} from "reactstrap";
import {
    publishProblem
} from "../../actions/channel/ProblemTitleAction";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {convertToRaw, EditorState, ContentState} from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from "draftjs-to-html";
import {getToken} from "../common/process";

class ChannelContentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: '',
            channelContent: '',
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

                console.log(hata)
            });




    }
    startPublishProcess = (token) =>
      {

        var apiBaseUrl = properties.channel_publishContent;



        var item = {
            "name": "",
            "text": this.state.channelContent,
            "channel": {
                "name": decodeURIComponent(this.props.channelName)
            }
        }

        this.clearForm();

        this.props.postData(apiBaseUrl, item, token);
    }
    handleKeyCommand(command: string): DraftHandleValue {
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

ChannelContentForm.propTypes = {
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

        postData: (url, item, token) => {console.log(url);  publishProblem(url, item, token)}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelContentForm);
