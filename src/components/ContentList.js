import React, { Component } from 'react';
import { connect } from 'react-redux';
import { contentsFetchData } from '../actions/contents';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { properties } from '../config/properties.js';
import PropTypes from 'prop-types'
import ProblemContentForm from "./ProblemContentForm";


class ContentList extends Component {

    componentDidUpdate(prevProps) {
        // only update chart if the data has changed
        console.log(this.props.searchCriteria);
        if (prevProps.searchCriteria !== this.props.searchCriteria) {
            this.props.fetchData(properties.serverUrl+ properties.getTitle + this.props.searchCriteria.title);
        }

    }
    componentDidMount() {
        this.props.fetchData(properties.serverUrl+ properties.getTitle + this.props.match.params.title);

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
                <b>  {this.props.match.params.title} </b>
            <ProblemContentForm title={this.props.match.params.title}/>
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
    searchCriteria:  PropTypes.object.isRequired,
    fetchData: PropTypes.func.isRequired,
    contents: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        searchCriteria: state.searchCriteria,
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
