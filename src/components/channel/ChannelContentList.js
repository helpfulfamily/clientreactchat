import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    channelContentsAppendList
} from '../../actions/channel/ChannelContentAction';
import {ListGroup, ListGroupItem} from 'reactstrap';
import PropTypes from 'prop-types';
import defaultavatar from '../user/default-avatar.png';


import {Editor} from 'react-draft-wysiwyg';
import {EditorState, ContentState} from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import './channelcontent.css';

import {
    Row,
    Col
} from 'reactstrap';
import ThankcoinPanel from "../thankcoin/ThankcoinPanel";
import {getTransaction} from "../common/TransactionProcess";
import {getChannelContentsOut} from "../../door/GetChannelContentsDoor";
import {appendChannelContentsOut} from "../../door/AppendChannelContentsDoor";
import ProfilePicture from "../common/ProfilePicture";


var pageNumber = 0;
var isScrollBottom = false;

class ChannelContentList extends Component {


    constructor(props) {
        super(props);

        this.listenScrollEvent = this.listenScrollEvent.bind(this);
    }

    contentToRender = (html) => {


        const contentBlock = htmlToDraft(html);

        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks,
            contentBlock.entityMap);
        const editorState = EditorState.createWithContent(contentState);

        return editorState;

    }

    componentDidMount() {

        this.props.getChannelContentsOut(this.props.title, pageNumber);

        this.toBottom();


    }

    listenScrollEvent() {


        // Bu kimse, eğer scrollu yukarılara çekip, geçmiş mesajlara bakmakta ise
        // yeni bir mesaj geldiğinde, scroll otomatik olarak aşağı inmesin diye
        // aşağıdaki isScrollBottom değişkenini oluşturup işaret olarak kullanıyoruz.
        // isScrollBottom== true ise, kullanıcı o an, chatleşme hâlindedir. Scroll en aşağıdadır.
        var messageBody = document.querySelector('#messageBody');

        var scrollBottonPos = messageBody.scrollHeight - messageBody.clientHeight;
        if (messageBody.scrollTop < scrollBottonPos) {
            isScrollBottom = false;

        } else if (messageBody.scrollTop == scrollBottonPos) {
            isScrollBottom = true;

        }

        // Scroll, en yukarı değdiğinde geçmiş mesajlar çağrılıyor.
        if (messageBody.scrollTop == 0) {

            pageNumber = pageNumber + 1;
            this.props.appendChannelContentsOut(this.props.title, pageNumber);
        }


    }


    componentDidUpdate(prevProps) {

        // Scroll ayarlaması ile ilgili kısım.
        var messageBody = document.querySelector('#messageBody');


        // isScrollBottom== true ise, kullanıcı o an, chatleşme hâlindedir. Scroll en aşağıdadır.
        if (isScrollBottom && prevProps.channelContents.length != this.props.channelContents.length) {

            this.toBottom();
        }

        // Yeni bir kanala girilip girilmediği bu şekilde öğrenilir.
        if (prevProps.title != this.props.title) {

            var channelName = this.props.title;


            // Kanaldaki mesajları çeker.
            pageNumber = 0;
            this.props.getChannelContentsOut(this.props.title, pageNumber);

            // Yeni kanala girildiği için, scrollu en aşağı atar.
            this.toBottom()

        }

    }


    toBottom() {
        var messageBody = document.querySelector('#messageBody');

        messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
    }

    profilePicture(picture) {
        if (picture === null) {
            picture = defaultavatar;
        }
        return picture;
    }


    render() {

        if (this.props.hasErrored) {
            console.log("Sorry! There was an error loading the contents")
        }

        if (this.props.isLoading) {
            console.log("Contents are loading.")
        }


        const list = <ListGroup className="scrollablediv" id="messageBody" onScroll={this.listenScrollEvent}>

            {
                this.props.channelContents.map((content) => (
                    <ListGroupItem key={content.id}>

                        <Row>
                            <Col xs="2">

                                <ProfilePicture user={content.user}/>


                            </Col>
                            <Col xs="9">

                                <div className="panel panel-default">

                                    <div className="panel-heading"><b>{content.user.username}</b></div>

                                    <Editor editorState={this.contentToRender(content.text)}

                                            readOnly={true} toolbarHidden={true}/>

                                    <ThankcoinPanel transaction={getTransaction(content.user.username
                                        , content.id, "ChannelContent", decodeURIComponent(this.props.title))}

                                                    currentThankAmount={content.currentThankAmount}/>

                                </div>


                            </Col>
                        </Row>

                    </ListGroupItem>


                ))}
        </ListGroup>;


        return (

            <div>
                {list}

            </div>

        );
    }
}

ChannelContentList.propTypes = {
    appendChannelContentsOut: PropTypes.func.isRequired,
    getChannelContentsOut: PropTypes.func.isRequired,
    channelContents: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    loginUser: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        channelContents: state.channelContents,
        hasErrored: state.channelContentsHasErrored,
        loginUser: state.loginReducer

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getChannelContentsOut: (channelName, pageNumber) => dispatch(getChannelContentsOut(channelName, pageNumber)),
        appendChannelContentsOut: (channelName, pageNumber) => dispatch(appendChannelContentsOut(channelName, pageNumber))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelContentList);
