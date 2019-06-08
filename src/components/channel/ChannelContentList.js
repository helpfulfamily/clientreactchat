import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    channelContentsFetchData,
    channelContentsAppendList
} from '../../actions/channel/ChannelContentAction';
import { ListGroup, ListGroupItem} from 'reactstrap';
import { properties } from '../../config/properties.js';
import PropTypes from 'prop-types'
import ChannelContentForm from "./ChannelContentForm";
import defaultavatar from '../user/default-avatar.png';


import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import './channelcontent.css';

import {
    Row,
    Col } from 'reactstrap';
import {Link} from "react-router-dom";
import ThankcoinPanel from "../thankcoin/ThankcoinPanel";
import ChannelInfo from "./ChannelInfo";


var amount=0;

class ChannelContentList extends Component {
    contentToRender = (html) => {


        const contentBlock = htmlToDraft(html);

        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks,
            contentBlock.entityMap);
        const editorState = EditorState.createWithContent(contentState);

        return editorState;

    }

    componentDidMount() {


        this.props.fetchData(properties.channel_contents+  this.props.match.params.title+ "/"+ amount);


    }

    componentDidUpdate(prevProps) {

        var messageBody = document.querySelector('#messageBody');
        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;

        if (prevProps.location.pathname != this.props.location.pathname) {
            amount=0;
            this.props.fetchData(properties.channel_contents + this.props.match.params.title + "/"+ amount);
        }

    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }


    profilePicture(picture) {
         if(picture===null){
             picture= defaultavatar;
         }
         return picture;
    }

    getTransaction(receiver, objectId)
    {


        var transaction = {
            receiver:{
                username:  receiver
            },
            objectType:"ChannelContent",
            objectId:objectId,
            name: decodeURIComponent(this.props.match.params.title)
        }
        return transaction;

    }
    render() {

        if (this.props.hasErrored) {
            console.log("Sorry! There was an error loading the contents")
        }

        if (this.props.isLoading) {
            console.log("Contents are loading.")
        }

        const list=<ListGroup className="scrollablediv"  id="messageBody">

            {
                this.props.contents.map((content) => (
                    <ListGroupItem key={content.id}>

                        <Row>
                            <Col xs="2">

                                <div className="content-img" >


                                    <Link to={{
                                        pathname: '/' + content.user.username,
                                        state: {
                                            username: content.user.username
                                        }
                                    }} >
                                     <span>
                                     <img     src={this.profilePicture(content.user.profilePhotoUrl) } alt=""   />
                                     </span>
                                    </Link>



                                </div>



                            </Col>
                            <Col xs="9">

                                <div className="panel panel-default">

                                    <div className="panel-heading"><b>{content.user.username}</b></div>

                                    <Editor editorState={this.contentToRender(content.text)}

                                            readOnly={true} toolbarHidden={true} />

                                    <ThankcoinPanel transaction={ this.getTransaction(content.user.username, content.id)} currentThankAmount={content.currentThankAmount}/>

                                </div>


                            </Col>
                        </Row>

                    </ListGroupItem>


                ))}
        </ListGroup>;

        return (
            <div>
                <ChannelInfo channelName={decodeURIComponent(this.props.match.params.title)}/>
                <b>  {decodeURIComponent(this.props.match.params.title)} </b>

                {list}
                <ChannelContentForm channelName={this.props.match.params.title}/>

            </div>
        );
    }
}

ChannelContentList.propTypes = {
    appendList: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    contents: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {

        contents: state.channelContents,
        hasErrored: state.channelContentsHasErrored,
        isLoading: state.channelContentsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(channelContentsFetchData(url)),
        appendList: (url) => dispatch(channelContentsAppendList(url))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelContentList);
