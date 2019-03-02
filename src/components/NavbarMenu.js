import React from 'react';
import {
  Nav,
  NavItem,
  NavLink} from 'reactstrap';
import {FaUnlockAlt} from "react-icons/fa";
import * as Keycloak from "keycloak-js";


const keycloak = Keycloak('/keycloak.json');

export default class NavbarMenu extends React.Component {
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
    keycloak.init(initOptions).success((authenticated)=>{
      this.setState({ keycloak: keycloak, authenticated: authenticated })
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

    if(this.state.keycloak) {
      if(this.state.authenticated){

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

    