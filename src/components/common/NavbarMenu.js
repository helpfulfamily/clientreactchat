import React from 'react';
import {
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    UncontrolledDropdown
} from 'reactstrap';
import connectWebSocket from '../../tools/websocket/action/websocket';
import {FaUnlockAlt} from "react-icons/fa";
import {Link} from "react-router-dom";

import {connect} from "react-redux";

import PropTypes from 'prop-types'
import logger from "../../tools/log/index";

import Responsive from 'react-responsive';
import 'react-toastify/dist/ReactToastify.css';

import '../../tools/asset/css/style.css';

import logo from "../../tools/asset/img/logo.svg";
import {FaUserCog} from "react-icons/fa/index";
import defaultavatar from "../user/style/default-avatar.png";
import {getLoginUser, login, logout} from "../user/process/LoginProcess";
import {getUserInformationOut} from "../user/door/GetUserInformationDoor";
import {ToastContainer} from "react-toastify";

const Desktop = props => <Responsive {...props} minWidth={992} />;
const Tablet = props => <Responsive {...props} minWidth={768} maxWidth={991} />;
const Mobile = props => <Responsive {...props} maxWidth={767} />;
const Default = props => <Responsive {...props} minWidth={768} />;


class NavbarMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
             modalProblemTitle: false,
            isOpen: false

        };
        this.toggle = this.toggle.bind(this);

        this.toggleProblemTitle = this.toggleProblemTitle.bind(this);

        this.setCurrentPath = this.setCurrentPath.bind(this);
     }
    setCurrentPath(event){
        this.setState({
            currentPath: event.target.value
        });

    }

    toggleProblemTitle() {
        this.setState(prevState => ({
            modalProblemTitle: !prevState.modalProblemTitle
        }));
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    componentDidMount() {



        if(typeof this.props.loginUser.sso==="undefined" ||
            (typeof this.props.loginUser.sso!=="undefined" && !this.props.loginUser.sso.isAuthenticated)) {

            getLoginUser().then( (loginUser) => this.loginPromiseResolved(loginUser)).catch(function(hata){
                logger.error(hata)
            });

        }
    }

  loginPromiseResolved(loginUser){
      if(loginUser!=null){
          // Kullanıcının profil bilgileri, Keycloack'tan gelen loginUser temel bilgisi üzerinden alınıyor.
          this.props.getUserInformationOut(loginUser);

          // WebSocket'e de bu noktada bağlanıyor.
          connectWebSocket(loginUser.sso.username);
      }
  }
  handleLogin(e) {
      e.preventDefault();

      login();

  }
  handleLogout(e) {
    e.preventDefault();

    logout();
  }
  profilePicture(picture) {
        if(picture===null){
            picture= defaultavatar;
        }
        return picture;
    }

  profileUrl(username) {

        return "/"+ username;
    }



  navContent="";

  render() {


      if((typeof this.props.loginUser.sso!=="undefined") && this.props.loginUser.sso.isAuthenticated) {

          this.navContent=(
              <Nav  className="ml-auto main-nav" navbar>



                  <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav caret>
                          <img className="nav-profile-img" src={this.profilePicture(this.props.loginUser.profilePhotoUrl) }  alt=""  />

                      </DropdownToggle>
                      <DropdownMenu right>
                          <DropdownItem>
                              <NavLink  href={this.profileUrl(this.props.loginUser.username) }><FaUserCog/> Profil</NavLink>
                          </DropdownItem>
                           <DropdownItem divider />
                          <DropdownItem>
                              <NavLink  href="#" onClick={this.handleLogout}><FaUnlockAlt /> Logout</NavLink>
                          </DropdownItem>
                      </DropdownMenu>
                  </UncontrolledDropdown>

              </Nav>

          );


      }else {
          this.navContent=(
              <Nav   className="ml-auto" navbar>
                   <NavItem>
                      <NavLink   href="#" onClick={this.handleLogin}><FaUnlockAlt />Login</NavLink>
                  </NavItem>

              </Nav>
          );
      }


      return (
          <div>
              <Navbar color="light" light expand="md" id="header" fixed="top" >
                  <NavbarBrand href="/" className="scrollto logo"><img src={logo}  /></NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                  <Collapse isOpen={this.state.isOpen} navbar>

                      <input type="text" value={this.state.currentPath} onChange={this.setCurrentPath} />


                          <Link to={{
                              pathname:  "/channelcontents/" + this.state.currentPath,

                          }}> Join</Link>

                      {this.navContent}
                  </Collapse>
              </Navbar>

              <ToastContainer
                  position="top-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnVisibilityChange
                  draggable
                  pauseOnHover
              />


          </div>
      );
  }
}


NavbarMenu.propTypes = {

    loginUser: PropTypes.object.isRequired,
    getUserInformationOut: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        loginUser: state.userInformationReducer
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        getUserInformationOut: (user) => {
            dispatch(getUserInformationOut(user))
        }

    };
};

    export default connect(mapStateToProps, mapDispatchToProps)(NavbarMenu);