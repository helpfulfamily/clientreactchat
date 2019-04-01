import React from 'react';

import {properties} from '../config/properties.js';
import {Button} from "reactstrap";
import {itemsPostData} from "../actions/items";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {convertToRaw, EditorState} from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from "draftjs-to-html";

class ProblemContentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
            editorState: EditorState.createEmpty()
        };


        this.handleSubmitProcess = this.handleSubmitProcess.bind(this);
    }
    onEditorStateChange = (editorState) => {

        this.setState({editorState: editorState});
        this.setState({content:  draftToHtml(convertToRaw(editorState.getCurrentContent()))});


    };





    handleSubmitProcess(event) {

        event.preventDefault();




        var apiBaseUrl = properties.createTitle;


        var item = {
            "id": 0,
            "name": "",
            "username":this.props.user.username,
            "text": this.state.content,
            "title": {
                "contents": [
                    null
                ],
                "id": 0,
                "name": this.props.title
            }
        }

         this.state.content="";
         this.props.postData(apiBaseUrl, item);

    }

    render() {
        if(this.props.user.isAuthenticated){
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
    user: PropTypes.object.isRequired,
    item: PropTypes.object.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.loginReducer,
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
