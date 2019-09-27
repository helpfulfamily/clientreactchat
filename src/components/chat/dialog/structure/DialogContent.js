import React, {Component} from 'react';
import '../style/dialog.css';
import ProfilePicture from "../../../user/structure/ProfilePicture";
import {Col, Row} from "reactstrap";
import {getTransaction} from "../../../thankcoin/process/TransactionProcess";
import ThankcoinPanel from "../../../thankcoin/structure/ThankcoinPanel";
import {Editor} from 'react-draft-wysiwyg';
import htmlToDraft from "html-to-draftjs";
import {ContentState, EditorState} from "draft-js";


export default class DialogContent extends Component {

    contentToRender = (html) => {


        const contentBlock = htmlToDraft(html);

        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks,
            contentBlock.entityMap);
        const editorState = EditorState.createWithContent(contentState);

        return editorState;

    };

    render() {


        return (
            <Row>
                <Col xs="2">
                    <ProfilePicture user={this.props.content.user}/>

                </Col>
                <Col xs="9">

                    <div className="panel panel-default">

                        <div className="panel-heading"><b>{this.props.content.user.username}</b></div>

                        <Editor editorState={this.contentToRender(this.props.content.text)}

                                readOnly={true} toolbarHidden={true}/>


                        <ThankcoinPanel transaction={getTransaction(this.props.content.user.username
                            , this.props.content.id, "DialogContent", decodeURIComponent(this.props.content.receiverID))}

                                        currentThankAmount={this.props.content.currentThankAmount}/>

                    </div>



                </Col>
            </Row>

        );
    }
}

