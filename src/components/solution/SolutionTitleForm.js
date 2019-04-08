import React from 'react';

import {properties} from '../../config/properties.js';
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {publishSolution} from "../../actions/solution/SolutionTitleAction";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {EditorState, convertToRaw} from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css'




class SolutionTitleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            solutionTitle: '',
            solutionContent: '',
            editorState: EditorState.createEmpty()
        };


        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleSubmitProcess = this.handleSubmitProcess.bind(this);

    }

    onEditorStateChange = (editorState) => {

        this.setState({editorState: editorState});

        this.setState({solutionContent:  draftToHtml(convertToRaw(editorState.getCurrentContent()))});


    };

    handleChangeTitle(event) {
        this.setState({solutionTitle: event.target.value});
    }


    handleSubmitProcess(event) {

        event.preventDefault();

        var apiBaseUrl = properties.solutiontitle_publishContent;



        var item = {
            "name": "",
            "user": this.props.loginUser,
            "text": this.state.solutionContent,
            "solutionTitle": {
                  "name": this.state.solutionTitle
            }
        }


         this.props.postData(apiBaseUrl, item);

    }

    render() {

         return (
            <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={this.props.className}
                   external={this.props.externalCloseBtn}>

                <ModalHeader>I can help!</ModalHeader>
                <ModalBody>


                    <label>   Solution Title:  </label>
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

SolutionTitleForm.propTypes = {
    postData: PropTypes.func.isRequired,
    loginUser: PropTypes.object.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        loginUser: state.loginReducer,
        hasErrored: state.solutionTitleHasErrored,
        isLoading: state.solutionTitleIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        postData: (url, item) => {console.log(url); dispatch(publishSolution(url, item))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SolutionTitleForm);
