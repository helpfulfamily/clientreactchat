import React, {Component} from 'react';
import {connect} from 'react-redux';
import {userFetchData} from '../action/ChannelObserverAction';
import {Link} from 'react-router-dom';
import {Col, ListGroup, ListGroupItem, Row} from 'reactstrap';
import {properties} from '../../../common/config/properties.js';
import PropTypes from 'prop-types';
import '../../../user/style/profil.css';
import defaultavatar from "../../../user/style/default-avatar.png";

var amount=30;

class ChannelObserverList extends Component {

    componentDidMount() {
        var channelName = "";
        if ( typeof  this.props.channel.name!=="undefined") {
            channelName = this.props.channel.name;
        }

        this.props.fetchData(properties.users_all + "/"+ amount+"/"+ channelName);
    }

    componentDidUpdate(prevProps) {


        if ( typeof  this.props.channel.name!=="undefined" && prevProps.channel.name !=
                                                                    this.props.channel.name) {

            this.props.fetchData(properties.users_all + "/"+ amount+"/"+this.props.channel.name);
        }

    }
    listenScrollEvent= () => {
        var messageBody = document.querySelector('#messageBody');
        var totalHeight = messageBody.scrollHeight;
        var clientHeight = messageBody.clientHeight;
        var scrollTop = messageBody.scrollTop;

        if (totalHeight == scrollTop + clientHeight){
            amount= amount + 10;
            if (typeof this.props.fetchData !== 'undefined'){
                this.props.fetchData(properties.users_all + "/"+ (10 + amount)+"/"+this.props.channel.name);

            }
        }
    };
    profilePicture(picture) {
        if(picture===null){
            picture= defaultavatar;
        }
        return picture;
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
        var list="";
        if(typeof this.props.users!=="undefined" && this.props.users.length>0){
            list=    <ListGroup className="scrollablediv" id="messageBody" onScroll={this.listenScrollEvent}>
                {this.props.users.map((user, index) => (
                    <ListGroupItem  key={user.id} className="content-img" >

                            <div className="content-img"  style={{ height: 99 , overflow: "auto" }}>
                                <Row>
                                    <Col xs="3">
                                        <Link to={{
                                            pathname: '/' +  user.username,
                                            state: {
                                                username: user.username
                                            }
                                        }} >
                                            <img     src={this.profilePicture(user.profilePhotoUrl) } alt=""   />
                                        </Link>
                                    </Col>
                                    <Col xs="7">
                                        <label className="align-content-center">{user.username}</label>
                                    </Col>
                                </Row>











                                </div>




                    </ListGroupItem>
                ))}
            </ListGroup>;
        }

        return (


                <div>

                        {list}



                </div>

        );
    }
}

ChannelObserverList.propTypes = {
    channel: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        users: state.users,
        hasErrored: state.problemTitleHasErrored,
        isLoading: state.problemTitleIsLoading,
        channel: state.channel

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        fetchData: (url) => { dispatch(userFetchData(url))},

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelObserverList);
