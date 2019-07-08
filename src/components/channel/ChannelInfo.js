import React, { Component} from 'react';

import PropTypes from 'prop-types'

import './channel.css';
import ObservationPanel from "../observation/ObservationPanel";
import {connect} from "react-redux";




class ChannelInfo extends Component {





    render() {


        return (
            <div>

                <ObservationPanel/>


            </div>
        );
    }
}

ChannelInfo.propTypes = {
    channel: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        channel: state.channel
    };
};

const mapDispatchToProps = (dispatch) => {
    return {



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelInfo);
