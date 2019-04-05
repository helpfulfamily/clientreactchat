import React from 'react';
import {Navbar, NavbarBrand, NavbarToggler, Collapse,
  Nav,
  NavItem,
  NavLink} from 'reactstrap';
import {FaHireAHelper, FaUnlockAlt} from "react-icons/fa";
import * as Keycloak from "keycloak-js";
import {connect} from "react-redux";

import { loginActionDispatcher } from '../actions/sso';
import PropTypes from 'prop-types'
import ModalExample from "./ModalExample";

import Responsive from 'react-responsive';
import ProblemTitleForm from "./ProblemTitleForm";

const keycloak = Keycloak('/keycloak.json');
const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;
class NavbarMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {modal: false };
        this.toggle = this.toggle.bind(this);

    }
    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    componentDidMount() {

        var initOptions = {
            responseMode: 'fragment',
            flow: 'standard',
            onLoad: 'check-sso'
        };
        if(typeof this.props.loginUser.sso==="undefined" ||
            (typeof this.props.loginUser.sso!=="undefined" && !this.props.loginUser.sso.isAuthenticated)) {
            keycloak.init(initOptions).success((authenticated) => {

                    var username="";
                    if(typeof keycloak.idTokenParsed !=="undefined"){
                        username= keycloak.idTokenParsed.preferred_username;

                        var sso = {isAuthenticated: authenticated, username: username }
                        var loginUser = {"sso": sso};
                        this.props.loginActionDispatcher(loginUser);
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
      const externalCloseBtn = <a className="nav-link text-white" href="#" onClick={this.toggle}><FaHireAHelper /> Help </a>;
      if((typeof this.props.loginUser.sso!=="undefined") && this.props.loginUser.sso.isAuthenticated) {

          this.navContent=(
              <Nav className="ml-auto"   navbar>
                  <NavItem>
                      {externalCloseBtn}

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
              <ProblemTitleForm externalCloseBtn={externalCloseBtn}

                                modal={this.state.modal}
                                toggle={this.toggle} />
          </Navbar>

      );
  }
}


NavbarMenu.propTypes = {
    loginUser: PropTypes.object.isRequired,
    loginActionDispatcher: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        loginUser: state.loginReducer
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