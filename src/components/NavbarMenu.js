import React from 'react';
import {Navbar, NavbarBrand, NavbarToggler, Collapse,
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
    componentDidMount() {

        var initOptions = {
            responseMode: 'fragment',
            flow: 'standard'
        };
        if(!this.props.user.isAuthenticated) {
            keycloak.init(initOptions).success((authenticated) => {

                    var username="";
                    if(typeof keycloak.idTokenParsed !=="undefined"){
                        username= keycloak.idTokenParsed.preferred_username;
                    }
                    var user = {isAuthenticated: authenticated, username: username }
                    this.props.loginActionDispatcher(user);

            }).error(function () {
                console.log('failed to initialize');
            });
        }
    }

  handleLogin(e) {
    e.preventDefault();

    keycloak.login();

  }
  handleLogout(e) {
    e.preventDefault();

    keycloak.logout();
  }

  navContent="";
  render() {

      if(this.props.user.isAuthenticated) {

          this.navContent=(
              <Nav className="ml-auto"   navbar>
                  <NavItem>
                      {this.props.externalCloseBtn}

                  </NavItem>

                  <NavItem>
                      <NavLink className="text-white"  href="#" onClick={this.handleLogout}><FaUnlockAlt /> Logout</NavLink>
                  </NavItem>


              </Nav>

          );


      }else {
          this.navContent=(
              <Nav className="ml-auto" navbar>
                  <NavItem >
                      <NavLink  className="text-white" href="#" onClick={this.handleLogin}><FaUnlockAlt />Login</NavLink>
                  </NavItem>
              </Nav>
          );
      }


      return (<Navbar fixed={'top'} expand="md">
          <NavbarBrand className="text-white" href="/"><b>helpful.army</b></NavbarBrand>



                      {this.navContent}

      </Navbar>);
  }
}


NavbarMenu.propTypes = {
    user: PropTypes.object.isRequired,
    loginActionDispatcher: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.loginReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        loginActionDispatcher: (user) => {
            dispatch(loginActionDispatcher(user))
        }

    };
}

    export default connect(mapStateToProps, mapDispatchToProps)(NavbarMenu);