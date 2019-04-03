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
import ModalExample from "./ModalExample";

import Responsive from 'react-responsive';

const keycloak = Keycloak('/keycloak.json');
const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;
class NavbarMenu extends React.Component {
    componentDidMount() {

        var initOptions = {
            responseMode: 'fragment',
            flow: 'standard',
            onLoad: 'check-sso'
        };
        if(!this.props.user.isAuthenticated) {
            keycloak.init(initOptions).success((authenticated) => {

                    var username="";
                    if(typeof keycloak.idTokenParsed !=="undefined"){
                        username= keycloak.idTokenParsed.preferred_username;
                        var user = {isAuthenticated: authenticated, username: username }
                        this.props.loginActionDispatcher(user);
                    }


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


      return (

          <Navbar fixed={'top'} expand="md">
          <NavbarBrand className="text-white" href="/"><b>helpful.army</b></NavbarBrand>
          <Mobile>
              <Nav className="ml-auto" navbar>
                  <ModalExample buttonLabel="Problems"/>
              </Nav>
          </Mobile>
          <Tablet>
              <Nav className="ml-auto" navbar>
                  <ModalExample buttonLabel="Problems"/>
              </Nav>
          </Tablet>

                      {this.navContent}

          </Navbar>

      );
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