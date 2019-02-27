import React, { Component} from 'react';
import { connect } from 'react-redux';
import { itemsFetchData } from '../actions/items';
import {Link} from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { properties } from '../config/properties.js';
import PropTypes from 'prop-types'

class ItemList extends Component {
    componentDidMount() {

        this.props.fetchData(properties.serverUrl + properties.getAllTitles);
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <div>
            <b>Problems:</b>
                <ListGroup>
                {this.props.items.map((item) => (
                    <ListGroupItem  key={item.id}> <Link to={{
                        pathname: '/contents/' + item.name,
                        state: {
                            name: item.name
                        }
                    }}> {item.name}</Link>
                    </ListGroupItem>
                   ))}
            </ListGroup>
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

        fetchData: (url) => {console.log(url); dispatch(itemsFetchData(url))}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
