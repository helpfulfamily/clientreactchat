import {
    getUserInformationAction
} from "../actions/user/GetUserInformationAction";

import {properties} from "../config/properties";
import axios from "axios";
import {createUser} from "../components/common/UserCreationProcess";

export function getUserInformationOut(loginUser) {
    return (dispatch) => {

        var headers = {

            'Content-Type': 'application/json',

        }

        var url= properties.serverUrl+ properties.user+ "/"+loginUser.sso.username;

        axios.get(url,{headers: headers})
            .then( (response) =>  {
                if(response.data!==""){

                     // Servisten dönen userInformation ile temel kullanıcı bilgilerini harmanlıyor.
                    var sso= loginUser.sso;
                    loginUser= response.data;
                    loginUser.sso= sso;
                }else{
                    createUser(loginUser.sso);

                }

                dispatch(getUserInformationIn(loginUser));




            });
    };
}

export function getUserInformationIn(contents) {
    const action=  getUserInformationAction(contents);
    return action;

}
