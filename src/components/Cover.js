import React from 'react';

import ChangeProfilePictureForm from "./ChangeProfilePictureForm";

import { Tooltip } from 'reactstrap';
import ChangeProfileCoverForm from "./ChangeProfileCoverForm";



export default class Cover extends React.Component {
    constructor(props) {
        super(props);
        this.state = {modal: false, modalCover:false,
            tooltipOpen: false, tooltipOpenCover: false};
        this.toggle = this.toggle.bind(this);
        this.toggleCover= this.toggleCover.bind(this);
        this.toggleToolTip = this.toggleToolTip.bind(this);
        this.toggleToolTipCover = this.toggleToolTipCover.bind(this);
    }


    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }
    toggleCover() {
        this.setState(prevState => ({
            modalCover: !prevState.modalCover
        }));
    }
    toggleToolTip() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }
    toggleToolTipCover() {
        this.setState({
            tooltipOpenCover: !this.state.tooltipOpenCover
        });
    }
    render() {
        var changeProfileUrlLink=<span> </span>;
        var changeProfileCoverLink=<span> </span>;


        if((typeof this.props.user.username!=="undefined") && this.props.user.username === this.props.loginUser.username){
            changeProfileUrlLink =  <span  id="tooltipTarget"> <Tooltip placement="top" isOpen={this.state.tooltipOpen}  target="tooltipTarget" toggle={this.toggleToolTip}>
                                 Click to change profile photo
                                </Tooltip>
                <a  href="#" onClick={this.toggle}> </a> </span>;

            changeProfileCoverLink =  <span> <Tooltip placement="bottom" isOpen={this.state.tooltipOpenCover}  target="tooltipTargetCover" toggle={this.toggleToolTipCover}>
                                 Click to change cover photo
                                </Tooltip>
                <a  href="#" onClick={this.toggleCover}  > </a> </span>;

        }
         return (
             <div  className="container">
                 <div className="row">
                     <div className="col-md-12">
                         <div className="fb-profile-block">

                             <div className="fb-profile-block-thumb cover-container" id="tooltipTargetCover">
                                 <a href="#"  >
                                 <img src={this.props.user.coverUrl} alt=""  />
                                 </a>
                                 {changeProfileCoverLink}
                             </div>
                             <div className="profile-img">


                                 <a href="#"  >

                                     <img src={this.props.user.profilePhotoUrl} alt=""  />

                                 </a>

                                 {changeProfileUrlLink}

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
                 <ChangeProfileCoverForm username={this.props.user.username} externalCloseBtn={changeProfileCoverLink}  modal={this.state.modalCover}  toggle={this.toggleCover} />

                 <ChangeProfilePictureForm username={this.props.user.username} externalCloseBtn={changeProfileUrlLink}  modal={this.state.modal}  toggle={this.toggle} />
             </div>

        );
    }
}


