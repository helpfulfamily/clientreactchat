import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ListGroup, ListGroupItem} from 'reactstrap';
import PropTypes from 'prop-types';
import defaultavatar from '../../../user/style/default-avatar.png';
import logger from "../../../../tools/log";
import '../style/dialogcontent.css';
import {getDialogContentsOut} from "../door/GetDialogContentsDoor";
import {appendDialogContentsOut} from "../door/AppendDialogContentsDoor";
import DialogContent from "./DialogContent";
import {getToken} from "../../../user/process/LoginProcess";


var pageNumber = 0;
var isScrollBottom = false;

class DialogContentList extends Component {


    constructor(props) {
        super(props);

        this.listenScrollEvent = this.listenScrollEvent.bind(this);
    }


    componentDidMount() {

        this.getOrAppendTokenAndThenContentList(pageNumber);
        this.toBottom();


    }

    getOrAppendTokenAndThenContentList(pageNumber, isAppend) {
        if (typeof this.props.loginUser.sso != "undefined") {
            getToken(this.props.loginUser.sso.keycloak)

            // Token alındı ise, getDialogContentsOut fonksiyonu çağrılarak, transaction gönderme işlemi başlatılır.

                .then((token) => {

                    if (isAppend) {
                        this.props.getDialogContentsOut(token, this.props.receiverID, pageNumber);

                    } else {
                        this.props.appendDialogContentsOut(token, this.props.receiverID, pageNumber);

                    }



                })

                // Eğer token alınırken bir hata oluştu ise, catch içerisinde o hata ekrana yazılıyor.

                .catch(function (hata) {

                    logger.error(hata)
                });
        }


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
            this.getOrAppendTokenAndThenContentList(pageNumber, true);
        }


    }


    componentDidUpdate(prevProps) {

        // Scroll ayarlaması ile ilgili kısım.
        var messageBody = document.querySelector('#messageBody');


        // isScrollBottom== true ise, kullanıcı o an, chatleşme hâlindedir. Scroll en aşağıdadır.
        if (isScrollBottom && prevProps.dialogContents.length != this.props.dialogContents.length) {

            this.toBottom();
        }

        // Yeni bir kanala girilip girilmediği bu şekilde öğrenilir.
        if (prevProps.receiverID != this.props.receiverID) {

            var receiverID = this.props.receiverID;


            // Dialogtaki mesajları çeker.
            pageNumber = 0;
            this.getTokenAndThenContentList(pageNumber);
            // Yeni kişinin dilaoğuna girildiği için, scrollu en aşağı atar.
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
            logger.error("Sorry! There was an error loading the contents")
        }

        if (this.props.isLoading) {
            logger.error("Contents are loading.")
        }


        console.log(this.props);


        return (

            <ListGroup className="scrollablediv" id="messageBody" onScroll={this.listenScrollEvent}>

                {

                    this.props.dialogContents.map((content) => (
                        <ListGroupItem key={content.id}>

                            <DialogContent content={content}/>



                        </ListGroupItem>


                    ))}
            </ListGroup>

        );
    }
}

DialogContentList.propTypes = {
    appendDialogContentsOut: PropTypes.func.isRequired,
    getDialogContentsOut: PropTypes.func.isRequired,
    dialogContents: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    loginUser: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        dialogContents: state.dialogContents,
        hasErrored: state.dialogContentsHasErrored,
        loginUser: state.userInformationReducer

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getDialogContentsOut: (token, receiverID, pageNumber) => dispatch(getDialogContentsOut(token, receiverID, pageNumber)),
        appendDialogContentsOut: (token, receiverID, pageNumber) => dispatch(appendDialogContentsOut(token, receiverID, pageNumber))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DialogContentList);
