import React, { Component} from 'react';
import { connect } from 'react-redux';
import { channelFetchData } from '../../actions/channel/ChannelAction';
import {Link} from 'react-router-dom';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { properties } from '../../config/properties.js';
import PropTypes from 'prop-types'

import './channel.css';

var amount=9;
class ChannelInfo extends Component {

    componentDidMount() {

        this.props.fetchData(properties.channels_all + "/"+ amount);
    }



    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }
        var list="";
        if(typeof this.props.channels!=="undefined" && this.props.channels.length>0){
            list= <ListGroup className="problemtitle">
                {this.props.channels.map((item, index) => (
                    <ListGroupItem  key={item.id}> <Link to={{
                        pathname: '/channel/' +encodeURIComponent(item.name),
                        state: {
                            name: item.name
                        }
                    }} > #{item.name}</Link>


                    </ListGroupItem>
                ))}
            </ListGroup>;
        }

        return (
            <div>


                Priority Channels

                        {list}


            </div>
        );
    }
}

ChannelInfo.propTypes = {
    fetchData: PropTypes.func.isRequired,
    channels: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        channels: state.channels,
        hasErrored: state.channelHasErrored,
        isLoading: state.channelIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        fetchData: (url) => {dispatch(channelFetchData(url))},

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelInfo);
