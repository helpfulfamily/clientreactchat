import React from 'react';
import {
  Nav,
  NavItem,
  NavLink} from 'reactstrap';
import {FaUnlockAlt} from "react-icons/fa";
import * as Keycloak from "keycloak-js";
import {connect} from "react-redux";

import { loginActionDispatcher } from '../actions/sso';
import PropTypes from 'prop-types'
const keycloak = Keycloak('/keycloak.json');

class NavbarMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keycloak: null, authenticated: false
    };

  }
  componentDidMount() {

    var initOptions = {
      responseMode: 'fragment',
      flow: 'standard'
    };
    console.log(this.props.keycloak);
    keycloak.init(initOptions).success((authenticated)=>{
      //this.setState({ keycloak: keycloak, authenticated: authenticated })

      if(authenticated){
           this.props.loginActionDispatcher(keycloak);
      }

    }).error(function() {
      console.log('failed to initialize');
    });

  }
  handleLogin(e) {
    e.preventDefault();

    keycloak.login();

  }
  handleLogout(e) {
    e.preventDefault();

    keycloak.logout();
  }


  render() {

    if(this.props.keycloak) {
        if(this.props.keycloak.authenticated) {

        return (
               <Nav className="ml-auto" navbar>
                    <NavItem>
                      {this.props.externalCloseBtn}

                    </NavItem>

                    <NavItem>
                      <NavLink href="#" onClick={this.handleLogout}><FaUnlockAlt /> Logout</NavLink>
                    </NavItem>


                  </Nav>

           );
        }
      }

    return (

              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="#" onClick={this.handleLogin}><FaUnlockAlt /> Login</NavLink>
                </NavItem>
                </Nav>


    );
  }
}


NavbarMenu.propTypes = {
    loginActionDispatcher: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        keycloak: state.loginReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        loginActionDispatcher: (keycloak) => {console.log(keycloak); dispatch(loginActionDispatcher(keycloak))}

    };
}

    export default connect(mapStateToProps, mapDispatchToProps)(NavbarMenu);