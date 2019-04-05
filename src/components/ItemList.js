import React, { Component} from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';
import {Link} from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { properties } from '../config/properties.js';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import   './title.css';
var amount=30;
class ItemList extends Component {

    componentDidMount() {

        this.props.fetchData(properties.serverUrl + properties.getAllTitles + "/"+ amount);
    }


    fetchMoreData = () => {
        this.props.fetchData(properties.serverUrl + properties.getAllTitles+ "/"+ (10 + amount));
     };
    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
        const list= <ListGroup>
            {this.props.items.map((item, index) => (
                <ListGroupItem  key={item.id}> <Link to={{
                    pathname: '/proso/contents/' + item.name,
                    state: {
                        name: item.name
                    }
                }} > {item.name}</Link>
                </ListGroupItem>
            ))}
        </ListGroup>;
        return (
            <div>

                <div id="scrollableDiv" style={{ height: 700, overflow: "auto" }}>

                <InfiniteScroll
                        dataLength={this.props.items.length}
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

ItemList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        items: state.items,
        hasErrored: state.itemsHasErrored,
        isLoading: state.itemsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        fetchData: (url) => {console.log(url); dispatch(itemsFetchData(url))},

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
