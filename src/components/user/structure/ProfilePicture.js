import React, {Component} from 'react';
import '../../chat/channel/style/channeltitle.css';
import {Link} from "react-router-dom";
import defaultavatar from "../style/default-avatar.png";

export default class ProfilePicture extends Component {

    profilePicture(picture) {
        if(picture===null){
            picture= defaultavatar;
        }
        return picture;
    }

    render() {

        return (
            <div className="content-img" >
                <Link to={{
                    pathname: "/dialogcontents/" + this.props.user.username,

                }}>

                                     <span>
                                     <img     src={this.profilePicture(this.props.user.profilePhotoUrl) } alt=""   />
                                     </span>
                </Link>



            </div>
        );
    }
}

