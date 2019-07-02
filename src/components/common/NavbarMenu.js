import React from 'react';
import {
    Navbar, NavbarBrand,
    Nav,
    NavItem,
    NavLink, NavbarToggler, Collapse, UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu, ListGroupItem
} from 'reactstrap';
import connectWebSocket from '../../actions/websocket';
import {FaHireAHelper, FaQuestionCircle, FaUnlockAlt} from "react-icons/fa";
import { Link } from "react-router-dom";

import {connect} from "react-redux";
import { loginActionDispatcher } from '../../actions/sso';
import PropTypes from 'prop-types'
import ModalExample from "./ModalExample";

import Responsive from 'react-responsive';
import ProblemTitleForm from "../channel/ProblemTitleForm";
import '../../css/style.css';

import logo from "../../img/logo.svg";
import {FaFacebookMessenger, FaLightbulb, FaRegLightbulb, FaUserCog} from "react-icons/fa/index";
import defaultavatar from "../user/default-avatar.png";
import  {getLoginUser, login, logout}  from "./LoginProcess";

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
                console.log(hata)
            });

        }
    }

  loginPromiseResolved(loginUser){
      if(loginUser!=null){
          this.props.loginActionDispatcher(loginUser);

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
                      <Mobile>
                          <Nav  navbar>
                              <ModalExample buttonLabel="Problems"/>
                          </Nav>
                      </Mobile>
                      <Tablet>
                          <Nav  navbar>
                              <ModalExample buttonLabel="Problems"/>
                          </Nav>
                      </Tablet>
                      <input type="text" value={this.state.currentPath} onChange={this.setCurrentPath} />


                          <Link to={{
                              pathname:  "/channelcontents/" + this.state.currentPath,

                          }}> Join</Link>

                      {this.navContent}
                  </Collapse>
              </Navbar>



          </div>
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