import React, { Component } from 'react';
import { connect } from 'react-redux';
import { contentsFetchData } from '../actions/contents';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { properties } from '../config/properties.js';
import PropTypes from 'prop-types'
import ProblemContentForm from "./ProblemContentForm";
import defaultuser from './default-avatar.png';
import {FaThumbsUp, FaShare} from "react-icons/fa";

import   './content.css';
import {
    Row,
    Col } from 'reactstrap';
class ContentList extends Component {

    componentDidUpdate(prevProps) {
        // only update chart if the data has changed
        console.log(this.props.searchCriteria);
        if (prevProps.searchCriteria !== this.props.searchCriteria) {
            this.props.fetchData(properties.serverUrl+ properties.getTitle + this.props.searchCriteria.title);
        }

    }
    componentDidMount() {
        document.title=  this.props.match.params.title;
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

                        <Row>
                            <Col xs="2" sm="1">
                                <img  className="picture align-baseline"  src={defaultuser} alt="Generic placeholder image" />
                            </Col>
                            <Col xs="9">
                                <Row>
                                    <Col>
                                    <p className="text-left align-text-top"><b>{content.username}</b></p>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <p className="text-justify align-middle">{content.text}</p>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>

                                        9 <FaThumbsUp/>

                                        {' '}

                                        9 <FaShare/>
                                    </Col>
                                </Row>

                            </Col>
                        </Row>

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
