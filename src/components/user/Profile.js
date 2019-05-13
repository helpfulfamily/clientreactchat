import React, { Component } from 'react';
import Cover from "./Cover";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import PropTypes from 'prop-types'

import {properties} from "../../config/properties";
import axios from "axios";
import './profil.css';

import {connect} from "react-redux";


  class Profile extends Component {
    constructor(props) {
        super(props);
        console.log(props);

        this.state = {user: {} };
        if(typeof  props.match.params.username != "undefined"){
            var headers = {

                'Content-Type': 'application/json',

            }

            var url= properties.serverUrl+ properties.user+ "/"+props.match.params.username;

            axios.get(url,{headers: headers})
                .then( (response) =>  {
                    if(response.data!==""){

                        this.setState({user: response.data });
                        console.log(this.state.user);
                    }


                })
                .catch( (error)  => {

                });

        }
    }




    render() {

        return (
            <Row>

                <Col>
                     <Cover loginUser={this.props.loginUser} user={this.state.user}/>
                </Col>

            </Row>


        )
    }


}


Profile.propTypes = {
    loginUser: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        loginUser: state.loginReducer
    };
};


export default connect(mapStateToProps)(Profile);
