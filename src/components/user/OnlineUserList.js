import React, { Component} from 'react';
import { connect } from 'react-redux';
import { userFetchData } from '../../actions/user/UserAction';
import {Link} from 'react-router-dom';
import {Col, ListGroup, ListGroupItem, Row} from 'reactstrap';
import { properties } from '../../config/properties.js';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import './profil.css';
import defaultavatar from "./default-avatar.png";

var amount=30;
class OnlineUserList extends Component {

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
    profilePicture(picture) {
        if(picture===null){
            picture= defaultavatar;
        }
        return picture;
    }
    fetchMoreData = () => {
        this.props.fetchData(properties.users_all + "/"+ (10 + amount)+"/"+this.props.channel.name);
     };

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
        var list="";
        if(typeof this.props.users!=="undefined" && this.props.users.length>0){
            list= <ListGroup>
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


                <div id="scrollableDiv" style={{ height: 700, overflow: "auto" }}>

                <InfiniteScroll
                        dataLength={this.props.users.length}
                        next={this.fetchMoreData}
                        hasMore={true}
                        loader={<br/>}
                        scrollableTarget="scrollableDiv"
                         >
                        {list}
                    </InfiniteScroll>


                </div>

        );
    }
}

OnlineUserList.propTypes = {
    channel: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        users: state.onlineUserList,
        hasErrored: state.problemTitleHasErrored,
        isLoading: state.problemTitleIsLoading,
        channel: state.channel

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        fetchData: (url) => {console.log(url); dispatch(userFetchData(url))},

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnlineUserList);
