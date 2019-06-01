import React, { Component} from 'react';

import PropTypes from 'prop-types'

import './channel.css';
import ObservationPanel from "../observation/ObservationPanel";
import {connect} from "react-redux";




 class ChannelInfo extends Component {





    render() {
        var divContext="";
        if(typeof  this.props.channel !== "undefined"){
              divContext=   <ObservationPanel   channel={this.props.channel} />;
        }

        return (
            <div>

                {divContext}


            </div>
        );
    }
}

ChannelInfo.propTypes = {

};

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelInfo);
