import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    channelContentsFetchData,
    channelContentsAppendList
} from '../../actions/channel/ChannelContentAction';
import {Button, ListGroup, ListGroupItem} from 'reactstrap';
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
import ObservationPanel from "../observation/ObservationPanel";
import axios from "axios";


var pageNumber=0;
var isScrollBottom=false;
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

        this.props.fetchData(properties.channel_contents+  this.props.match.params.title+ "/"+ pageNumber);
        this.toBottom();
        this.getOnlineUserList("join");

    }
    listenScrollEvent() {


         // Bu kimse, eğer scrollu yukarılara çekip, geçmiş mesajlara bakmakta ise
         // yeni bir mesaj geldiğinde, scroll otomatik olarak aşağı inmesin diye
         // aşağıdaki isScrollBottom değişkenini oluşturup işaret olarak kullanıyoruz.
         // isScrollBottom== true ise, kullanıcı o an, chatleşme hâlindedir. Scroll en aşağıdadır.
        var messageBody = document.querySelector('#messageBody');

        var scrollBottonPos= messageBody.scrollHeight - messageBody.clientHeight;
        if(messageBody.scrollTop< scrollBottonPos){
            isScrollBottom=false;

        } else if(messageBody.scrollTop == scrollBottonPos){
            isScrollBottom=true;

        }

        // Scroll, en yukarı değdiğinde geçmiş mesajlar çağrılıyor.
        if(messageBody.scrollTop==0){

            pageNumber=pageNumber+1;
            this.props.appendList(properties.channel_contents + this.props.match.params.title + "/"+ pageNumber);
        }


    }


    componentDidUpdate(prevProps) {

        // Scroll ayarlaması ile ilgili kısım.
        var messageBody = document.querySelector('#messageBody');


        // isScrollBottom== true ise, kullanıcı o an, chatleşme hâlindedir. Scroll en aşağıdadır.
        if (isScrollBottom &&  prevProps.contents.length !=  this.props.contents.length) {

            this.toBottom();
        }

        // Yeni bir kanala girilip girilmediği bu şekilde öğrenilir.
        if (prevProps.location.pathname != this.props.location.pathname) {

            // Kanaldaki online kullanıcı listesini bu şekilde alır.
            this.getOnlineUserList("join");

            // Kanaldaki mesajları çeker.
            pageNumber=0;
            this.props.fetchData(properties.channel_contents + this.props.match.params.title + "/"+ pageNumber);

            // Yeni kanala girildiği için, scrollu en aşağı atar.
            this.toBottom()

        }

    }

    getOnlineUserList(actionType){
        var channelName= this.props.location.pathname;
        channelName = decodeURIComponent(channelName);
        channelName = channelName.replace("\/channelcontents\/","")
        this.userChannelJoinPart(this.props.loginUser.sso.username, channelName, actionType);
    }

    userChannelJoinPart(username, channelName, actionType){
        var headers = {

            'Content-Type': 'application/json',

        }

        var url= properties.serverUrl+ properties.user+ "/userChannelJoinPart/" +username+ "/"+ channelName + "/" + actionType;

        axios.get(url,{headers: headers})
            .then( (response) =>  {

            })
            .catch( (error)  => {

            });


    }
    partChannel(event) {
        event.preventDefault();
        this.getOnlineUserList("part");
    }

   toBottom(){
       var messageBody = document.querySelector('#messageBody');

       messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight;
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
        var buttonPartChannel =<Button color="primary" onClick={(e) => this.partChannel(e)}> Part Channel </Button>;


        const list=<ListGroup className="scrollablediv"  id="messageBody"  onScroll={this.listenScrollEvent}>

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
                <ObservationPanel/>
                <b>  {decodeURIComponent(this.props.match.params.title)} </b>
                {buttonPartChannel}
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
    loginUser: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        contents: state.channelContents,
        hasErrored: state.channelContentsHasErrored,
        isLoading: state.channelContentsIsLoading,
        loginUser: state.loginReducer

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(channelContentsFetchData(url)),
        appendList: (url) => dispatch(channelContentsAppendList(url))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelContentList);
