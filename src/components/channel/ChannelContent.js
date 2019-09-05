import React, {Component} from 'react';
import '../channel/channeltitle.css';

import ProfilePicture from "../common/ProfilePicture";
import {Col, Row} from "reactstrap";
 import {getTransaction} from "../common/TransactionProcess";
import ThankcoinPanel from "../thankcoin/ThankcoinPanel";
import {Editor} from 'react-draft-wysiwyg';
import htmlToDraft from "html-to-draftjs";
import {ContentState, EditorState} from "draft-js";



export default class ChannelContent extends Component {

    contentToRender = (html) => {


        const contentBlock = htmlToDraft(html);

        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks,
            contentBlock.entityMap);
        const editorState = EditorState.createWithContent(contentState);

        return editorState;

    }

    render() {
        console.log(this.props.content)

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
                            , this.props.content.id, "ChannelContent", decodeURIComponent(this.props.content.channel.name))}

                                        currentThankAmount={this.props.content.currentThankAmount}/>

                    </div>



                </Col>
            </Row>

        );
    }
}

