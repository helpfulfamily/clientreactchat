import React, { Component } from 'react';
import { connect } from 'react-redux';
import { contentsFetchData, contentsAppendList } from '../actions/contents';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { properties } from '../config/properties.js';
import PropTypes from 'prop-types'
import ProblemContentForm from "./ProblemContentForm";
import defaultuser from './default-avatar.png';
import {FaThumbsUp, FaShare} from "react-icons/fa";
import MetaTags from 'react-meta-tags';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import   './content.css';
import {
    Row,
    Col } from 'reactstrap';

var amount=0;
class ContentList extends Component {
    contentToRender = (html) => {


        const contentBlock = htmlToDraft(html);

        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks,
            contentBlock.entityMap);
        const editorState = EditorState.createWithContent(contentState);

        return editorState;

    }

    componentDidMount() {

        window.addEventListener('scroll', this.onScroll, false);

        this.props.fetchData(properties.serverUrl+ properties.getTitle +  this.props.match.params.title+ "/"+ amount);


    }

    componentDidUpdate(prevProps) {


        if (prevProps.location.pathname != this.props.location.pathname) {
            amount=0;
            this.props.fetchData(properties.serverUrl+ properties.getTitle +  this.props.match.params.title+ "/"+ amount);
        }

    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }
    onScroll = () => {
        var totalHeight = document.documentElement.scrollHeight;
        var clientHeight = document.documentElement.clientHeight;
        var scrollTop = (document.body && document.body.scrollTop)
            ? document.body.scrollTop : document.documentElement.scrollTop;
        if (totalHeight == scrollTop + clientHeight){
            amount= amount + 10;
            if (typeof this.props.appendList !== 'undefined'){
                this.props.appendList(properties.serverUrl+ properties.getTitle +  this.props.match.params.title+ "/"+ (amount));

            }
        }
    }


    render() {

        if (this.props.hasErrored) {
            console.log("Sorry! There was an error loading the contents")
        }

        if (this.props.isLoading) {
            console.log("Contents are loading.")
        }

        const list=<ListGroup>

            {
                this.props.contents.map((content) => (
                    <ListGroupItem key={content.id}>

                        <Row>
                            <Col xs="2">
                                <img  className="picture align-baseline"  src={defaultuser} alt="Generic placeholder image" />
                            </Col>
                            <Col xs="9">

                                <div className="panel panel-default">
                                    <div className="panel-heading"><b>{content.username}</b></div>

                                    <Editor editorState={this.contentToRender(content.text)}

                                            readOnly={true} toolbarHidden={true} />

                                    <div className="card-footer">  9 <FaThumbsUp/>

                                        {' '}

                                        9 <FaShare/></div>
                                </div>


                            </Col>
                        </Row>

                    </ListGroupItem>
                ))}
        </ListGroup>;

        return (
            <div>
                <div className="wrapper">

                    <MetaTags>
                        <title>{this.props.match.params.title} </title>
                        <meta name="description" content="Join the helpful army!" />
                        <meta property="og:title" content={this.props.match.params.title} />
                        <meta property="og:image" content="https://www.helpful.army/static/media/default-avatar.9a4d85aa.png" />
                    </MetaTags>
                </div>
                <b>  {this.props.match.params.title} </b>
                <ProblemContentForm title={this.props.match.params.title}/>

                {list}


            </div>
        );
    }
}

ContentList.propTypes = {
    appendList: PropTypes.func.isRequired,
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
        fetchData: (url) => dispatch(contentsFetchData(url)),
        appendList: (url) => dispatch(contentsAppendList(url))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentList);
