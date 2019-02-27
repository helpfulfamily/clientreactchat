import React, { Component } from 'react';
import { connect } from 'react-redux';
import { contentsFetchData } from '../actions/contents';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { properties } from '../config/properties.js';
import PropTypes from 'prop-types'


class ContentList extends Component {
    componentDidUpdate(prevProps) {
        // only update chart if the data has changed
        if (prevProps.location.state.name !== this.props.location.state.name) {
            this.props.fetchData(properties.serverUrl+ properties.getTitle + this.props.location.state.name);
        }
    }
    componentDidMount() {
        this.props.fetchData(properties.serverUrl+ properties.getTitle + this.props.location.state.name);
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the contents</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <div>
                <b>Contents: </b>
            <ListGroup>
                 {this.props.contents.map((content) => (
                    <ListGroupItem key={content.id}>
                        {content.text}
                    </ListGroupItem>
                ))}
            </ListGroup>
            </div>
        );
    }
}

ContentList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    contents: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        contents: state.contents,
        hasErrored: state.contentsHasErrored,
        isLoading: state.contentsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(contentsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentList);
