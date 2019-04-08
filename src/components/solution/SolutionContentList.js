import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    solutionContentsFetchData,
    solutionContentsAppendList
} from '../../actions/solution/SolutionContentAction';
import {ListGroup, ListGroupItem, Tooltip} from 'reactstrap';
import { properties } from '../../config/properties.js';
import PropTypes from 'prop-types'
import SolutionContentForm from "./SolutionContentForm";
import defaultavatar from '../user/default-avatar.png';
import {FaThumbsUp, FaShare} from "react-icons/fa";

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import './solutioncontent.css';

import {
    Row,
    Col } from 'reactstrap';
import {Link} from "react-router-dom";

var amount=0;
class SolutionContentList extends Component {
    contentToRender = (html) => {


        const contentBlock = htmlToDraft(html);

        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks,
            contentBlock.entityMap);
        const editorState = EditorState.createWithContent(contentState);

        return editorState;

    }

    componentDidMount() {

        window.addEventListener('scroll', this.onScroll, false);

        this.props.fetchData(properties.solutiontitle_contents+  this.props.match.params.title+ "/"+ amount);


    }

    componentDidUpdate(prevProps) {


        if (prevProps.location.pathname != this.props.location.pathname) {
            amount=0;
            this.props.fetchData(properties.solutiontitle_contents +  this.props.match.params.title+ "/"+ amount);
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
                this.props.appendList(properties.solutiontitle_contents +  this.props.match.params.title+ "/"+ (amount));

            }
        }
    }

    profilePicture(picture) {
         if(picture===null){
             picture= defaultavatar;
         }
         return picture;
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

                                <div className="content-img" >


                                    <Link to={{
                                        pathname: '/' + content.user.username,
                                        state: {
                                            username: content.user.username
                                        }
                                    }} >
                                     <span>
                                     <img     src={this.profilePicture(content.user.profilePhotoUrl) } alt=""   />
                                     </span>
                                    </Link>



                                </div>



                            </Col>
                            <Col xs="9">

                                <div className="panel panel-default">
                                    <div className="panel-heading"><b>{content.user.username}</b></div>

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

                <b>  {this.props.match.params.title} </b>
                <SolutionContentForm solutionTitle={this.props.match.params.title}/>

                {list}


            </div>
        );
    }
}

SolutionContentList.propTypes = {
    appendList: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    contents: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        contents: state.solutionContents,
        hasErrored: state.solutionContentsHasErrored,
        isLoading: state.solutionContentsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(solutionContentsFetchData(url)),
        appendList: (url) => dispatch(solutionContentsAppendList(url))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SolutionContentList);
