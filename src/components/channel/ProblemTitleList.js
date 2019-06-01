import React, {Component} from 'react';
import {connect} from 'react-redux';
import {problemTitleFetchData} from '../../actions/channel/ProblemTitleAction';
import {Link} from 'react-router-dom';
import {ListGroup, ListGroupItem} from 'reactstrap';
import {properties} from '../../config/properties.js';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import './channeltitle.css';
import ThankcoinPanel from "../thankcoin/ThankcoinPanel";

var amount = 30;

class ProblemTitleList extends Component {

    componentDidMount() {


    }


    getTransaction(receiver, objectId) {

        var transaction = {
            receiver: {
                username: receiver
            },
            objectType: "Channel",
            objectId: objectId,
            name: ""
        }
        return transaction;

    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
        var list = "";
        if (typeof this.props.loginUser !== "undefined" && typeof this.props.loginUser.channels !== "undefined" && this.props.loginUser.channels.length > 0) {
            list = <ListGroup className="problemtitle">
                {this.props.loginUser.channels.map((item, index) => (
                    <ListGroupItem key={item.id}> <Link to={{
                        pathname: '/channelcontents/' + encodeURIComponent(item.name),
                        state: {
                            name: item.name
                        }
                    }}> #{item.name}</Link>
                        <ThankcoinPanel transaction={this.getTransaction(this.props.loginUser.username, item.id)}
                                        currentThankAmount={item.currentThankAmount}/>

                    </ListGroupItem>
                ))}
            </ListGroup>;
        }

        return (
            <div>

                <div id="scrollableDiv" style={{height: 700, overflow: "auto"}}>

                    <InfiniteScroll
                        dataLength={this.props.problemTitles.length}
                        next={this.fetchMoreData}
                        hasMore={true}
                        loader={<br/>}
                        scrollableTarget="scrollableDiv"
                    >
                        {list}
                    </InfiniteScroll>
                </div>
            </div>
        );
    }
}

ProblemTitleList.propTypes = {

    fetchData: PropTypes.func.isRequired,
    problemTitles: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    loginUser: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        problemTitles: state.problemTitles,
        hasErrored: state.problemTitleHasErrored,
        isLoading: state.problemTitleIsLoading,
        loginUser: state.loginReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        fetchData: (url) => {
            console.log(url);
            dispatch(problemTitleFetchData(url))
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProblemTitleList);
