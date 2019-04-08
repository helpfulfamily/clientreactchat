import React from 'react';

import {properties} from '../../config/properties.js';
import {Button} from "reactstrap";
import {publishProblem} from "../../actions/problem/ProblemTitleAction";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {convertToRaw, EditorState} from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from "draftjs-to-html";

class ProblemContentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problemTitle: '',
            problemContent: '',
            editorState: EditorState.createEmpty()
        };


        this.handleSubmitProcess = this.handleSubmitProcess.bind(this);

    }

    onEditorStateChange = (editorState) => {

        this.setState({editorState: editorState});

        this.setState({problemContent:  draftToHtml(convertToRaw(editorState.getCurrentContent()))});


    };



    handleSubmitProcess(event) {

        event.preventDefault();

        var apiBaseUrl = properties.problemtitle_publishContent;



        var item = {
            "name": "",
            "user": this.props.loginUser,
            "text": this.state.problemContent,
            "problemTitle": {
                "name": this.props.problemTitle
            }
        }


        this.props.postData(apiBaseUrl, item);

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
                    />


                    <Button color="primary" onClick={this.handleSubmitProcess}>Submit</Button>{' '}


                </div>

            );
        }else{
            return ("");
                }

    }
}

ProblemContentForm.propTypes = {
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

        postData: (url, item) => {console.log(url); dispatch(publishProblem(url, item))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemContentForm);
