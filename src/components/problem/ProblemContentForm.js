import React from 'react';

import {properties} from '../../config/properties.js';
import {Button} from "reactstrap";
import {
    problemTitleFetchDataSuccess,
    problemTitleHasErrored, problemTitleIsLoading,
    publishProblem
} from "../../actions/problem/ProblemTitleAction";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {convertToRaw, EditorState} from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from "draftjs-to-html";
import axios from "axios";

class ProblemContentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            problemTitle: '',
            problemContent: '',
            editorState: EditorState.createEmpty()
        };


        this.handleSubmitProcess = this.handleSubmitProcess.bind(this);
        this.sendTransaction = this.sendTransaction.bind(this);

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

    getToken(){
    var keycloak= this.props.loginUser.sso.keycloak;
    var isExpired = keycloak.isTokenExpired();
    var token = keycloak.token;

    if (isExpired) {
        keycloak.updateToken(5)
            .success(function() {

                // UPDATE THE TOKEN
                token = keycloak.token;
                return token;

            })
            .error(function() {
                console.error('Failed to refresh token');
            });
    }else{
        return token;

    }
    }
    sendTransaction(event) {
        var bearer=  ' Bearer ' +  this.getToken();
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': bearer,
            'Access-Control-Allow-Origin': '*'
        }

        var transaction = {
        }

       console.log(bearer);
        axios.post("https://localhost:8443/transaction/sendThankCoin", transaction, {headers: headers})

            .then( (response)  => {
                if (!response.status) {
                    throw Error(response.statusText);
                }
                if(response.data!==""){

                }

            })
            .catch( (error)  => {

            })
            .then( () =>  {




            });

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


                    <Button color="primary" onClick={this.handleSubmitProcess}>Publish</Button>{' '}


                    <p/>
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
