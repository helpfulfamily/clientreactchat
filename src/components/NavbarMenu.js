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
        if(!this.props.isAuthenticated) {
            keycloak.init(initOptions).success((authenticated) => {
                this.props.loginActionDispatcher(authenticated);


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

      if(this.props.isAuthenticated) {

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
    isAuthenticated: PropTypes.bool.isRequired,
    loginActionDispatcher: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.loginReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        loginActionDispatcher: (authenticated) => {
            dispatch(loginActionDispatcher(authenticated))
        }

    };
}

    export default connect(mapStateToProps, mapDispatchToProps)(NavbarMenu);