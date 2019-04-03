import React from 'react';

import ChangeProfilePictureForm from "./ChangeProfilePictureForm";

import { Tooltip } from 'reactstrap';



export default class Cover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modal: false,
            tooltipOpen: false};
        this.toggle = this.toggle.bind(this);
        this.toggleToolTip = this.toggleToolTip.bind(this);

    }


    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    toggleToolTip() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }
    render() {
        const externalCloseBtn = <a className="nav-link text-white" href="#" onClick={this.toggle}> </a>;

         return (
             <div  className="container">
                 <div className="row">
                     <div className="col-md-12">
                         <div className="fb-profile-block">
                             <div className="fb-profile-block-thumb cover-container"></div>
                             <div className="profile-img" >
                                 <span  id="tooltipTarget">
                                 <Tooltip placement="bottom" isOpen={this.state.tooltipOpen}  target="tooltipTarget" toggle={this.toggleToolTip}>
                                    Click to change photo
                                 </Tooltip>
                                 <a href="#">
                                     <img     src={this.props.user.profilePhotoUrl} alt=""   />

                                 </a>

                                 {externalCloseBtn}
                                 </span>
                             </div>
                             <div className="profile-name" >
                                 <a href="/profile">
                                 <h2>{this.props.user.username}</h2>
                                 </a>
                             </div>

                             <div className="fb-profile-block-menu" >
                                 <div className="block-menu">
                                     <ul>
                                         <li><a href="#">Timeline</a></li>
                                         <li><a href="#">about</a></li>
                                         <li><a href="#">Friends</a></li>
                                         <li><a href="#">Photos</a></li>
                                         <li><a href="#">More...</a></li>
                                     </ul>
                                 </div>
                                 <div className="block-menu">
                                     <ul>
                                         <li><a href="#">Timeline</a></li>
                                         <li><a href="#">about</a></li>
                                         <li><a href="#">Friends</a></li>
                                         <li><a href="#">Photos</a></li>
                                         <li><a href="#">More...</a></li>
                                     </ul>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
                 <ChangeProfilePictureForm username={this.props.user.username} externalCloseBtn={externalCloseBtn}  modal={this.state.modal}  toggle={this.toggle} />
             </div>

        );
    }
}


