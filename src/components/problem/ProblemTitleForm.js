import React from 'react';

import {properties} from '../../config/properties.js';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {publishProblem} from "../../actions/problem/ProblemTitleAction";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {EditorState, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'




class ProblemTitleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problemTitle: '',
            problemContent: '',
            editorState: EditorState.createEmpty()
        };


        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmitProcess = this.handleSubmitProcess.bind(this);

    }

    onEditorStateChange = (editorState) => {

        this.setState({editorState: editorState});

        this.setState({problemContent:  draftToHtml(convertToRaw(editorState.getCurrentContent()))});


    };

    handleChangeTitle(event) {
        this.setState({problemTitle: event.target.value});
    }


    handleSubmitProcess(event) {

        event.preventDefault();

        var apiBaseUrl = properties.problemtitle_publishContent;



        var item = {
            "name": "",
            "user": this.props.loginUser,
            "text": this.state.problemContent,
            "problemTitle": {
                  "name": this.state.problemTitle
            }
        }


         this.props.postData(apiBaseUrl, item);

    }

    render() {

         return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}
                   external={this.props.externalCloseBtn}>

                <ModalHeader>I need help!</ModalHeader>
                <ModalBody>


                    <label>   Problem Title:  </label>
                            <br/>

                            <input type="text" value={this.state.title} onChange={this.handleChangeTitle} />


                        <br/>

                    <div >


                            <Editor
                                editorState={this.state.editorState}
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                onEditorStateChange={this.onEditorStateChange}
                            />



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

ProblemTitleForm.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProblemTitleForm);
