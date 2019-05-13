import React, { Component} from 'react';
import { connect } from 'react-redux';
import { solutionTitleFetchData } from '../../actions/solution/SolutionTitleAction';
import {Link} from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { properties } from '../../config/properties.js';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import './solutiontitle.css';
import ThankcoinPanel from "../thankcoin/ThankcoinPanel";
var amount=30;
class SolutionTitleList extends Component {

    componentDidMount() {
        var channelName = "";
        if ( typeof  this.props.channel.name!=="undefined") {
            channelName = this.props.channel.name;
        }

        this.props.fetchData(properties.solutiontitle_all + "/"+ amount+"/"+ channelName);
    }

    componentDidUpdate(prevProps) {
        var channelName = "";
        if ( typeof  this.props.channel.name!=="undefined") {
            channelName = this.props.channel.name;
        }


        if (  prevProps.channel.name !=  this.props.channel.name) {

            this.props.fetchData(properties.solutiontitle_all + "/"+ amount+"/"+channelName);
        }

    }


    fetchMoreData = () => {
        var channelName = "";
        if ( typeof  this.props.channel.name!=="undefined") {
            channelName = this.props.channel.name;
        }
        this.props.fetchData(properties.solutiontitle_all + "/"+ (10 + amount)+"/"+channelName);

     };
    getTransaction(receiver, objectId)
    {

        var transaction = {
            receiver:{
                username:  receiver
            },
            objectType:"SolutionTitle",
            objectId:objectId,
            name:""
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
        var list="";
        if(typeof this.props.solutionTitles!=="undefined" && this.props.solutionTitles.length>0){
            list= <ListGroup className="solutiontitle">
                {this.props.solutionTitles.map((item, index) => (
                    <ListGroupItem  key={item.id}> <Link to={{
                        pathname: '/solutioncontents/' + item.name,
                        state: {
                            name: item.name
                        }
                    }} > {item.name}</Link>
                        <ThankcoinPanel transaction={ this.getTransaction(item.user.username, item.id)} currentThankAmount={item.currentThankAmount}/>

                    </ListGroupItem>
                ))}
            </ListGroup>;
        }

        return (
            <div>

                <div id="scrollableDiv" style={{ height: 700, overflow: "auto" }}>

                <InfiniteScroll
                        dataLength={this.props.solutionTitles.length}
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

SolutionTitleList.propTypes = {
    channel: PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
    solutionTitles: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        solutionTitles: state.solutionTitles,
        hasErrored: state.solutionTitleHasErrored,
        isLoading: state.solutionTitleIsLoading,
        channel: state.channel
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        fetchData: (url) => {console.log(url); dispatch(solutionTitleFetchData(url))},

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SolutionTitleList);
