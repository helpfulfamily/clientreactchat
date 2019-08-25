import React, { Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {Col, ListGroup, ListGroupItem, Row} from 'reactstrap';
import { properties } from '../../config/properties.js';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import './profil.css';
import defaultavatar from "./default-avatar.png";
import {getOnlineUserList} from "../channel/OnlineUserUtil";

var amount=30;
class OnlineUserList extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {


        this.startOnlineListProcess();


    }
    startOnlineListProcess() {


            var channelName= window.location.pathname;
            channelName = decodeURIComponent(channelName);
            channelName = channelName.replace("\/channelcontents\/","")

            getOnlineUserList(this.props.loginUser.sso.username,"join", channelName)


    }

    componentDidUpdate(prevProps) {

      // Yeni bir kanala girilip girilmediği bu şekilde öğrenilir.
        if(typeof prevProps.location!== "undefined" &&  typeof this.props.location!== "undefined"){

            if ( prevProps.location.pathname != this.props.location.pathname) {

                this.startOnlineListProcess();

            }

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




                                <Link to={{
                                    pathname:    "/dialogcontents/" + user.username ,

                                }}>  <img     src={this.profilePicture(user.profilePhotoUrl) } alt=""   /> </Link>



                            </div>

                        <label className="align-content-center">{user.username}</label>

                    </ListGroupItem>
                ))}
            </ListGroup>;
        }

        return (


                <div id="scrollableDiv" style={{ height: 700, overflow: "auto" }}>
                    { (typeof this.props.users!="undefined" && this.props.users.length>0)  ?
                    <InfiniteScroll
                        dataLength={this.props.users.length}
                        next={this.fetchMoreData}
                        hasMore={true}
                        loader={<br/>}
                        scrollableTarget="scrollableDiv"
                    >
                        {list}
                    </InfiniteScroll>: ''}




                </div>

        );
    }
}

OnlineUserList.propTypes = {
    channel: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    loginUser: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        users: state.onlineUserList,
        hasErrored: state.problemTitleHasErrored,
        isLoading: state.problemTitleIsLoading,
        channel: state.channel,
        loginUser: state.loginReducer

    };
};


export default connect(mapStateToProps, {})(OnlineUserList);
