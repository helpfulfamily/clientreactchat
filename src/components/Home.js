import React, {Component} from 'react';


import {Route, Switch} from "react-router-dom";


import PropTypes from 'prop-types'


import Profile from "./user/structure/Profile";
import NavbarMenu from "./common/structure/NavbarMenu";
import MainFrame from "./common/structure/MainFrame";
import {channelGetByName} from "./chat/channel/action/ChannelAction";
import {connect} from "react-redux";
import {properties} from "./common/config/properties";


var channelName="";

class Home extends Component {

    constructor(props) {
        super(props);
        channelName = this.props.match.params[0];
        this.getChannelProcess(channelName);
    }


    componentDidUpdate(prevProps)
    {

        if (prevProps.match.params[0] !=  this.props.match.params[0]) {
            channelName = this.props.match.params[0];
            this.getChannelProcess(channelName);
        }

    }
    getChannelProcess(channelName)
    {


            if (channelName.includes("channelcontents/")) {
                channelName = channelName.replace("channelcontents/", "");

                this.props.channelChanged(properties.channel_by_name+ "/", channelName);

            }  

    }
    render() {


        return (
            <div>

                <NavbarMenu/>
                <br/>
                <br/>
                <br/>
                <br/>


                <Switch>
                    <Route exact path="/:username" component={Profile} />
                    <Route exact  path="/*" component={MainFrame} />


                </Switch>
            </div>
        );
    }
}


Home.propTypes = {

    channelChanged: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {

    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        channelChanged: (url, channelName) => {
            dispatch(channelGetByName(url, channelName))
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

