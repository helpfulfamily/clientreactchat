import {getUserInformationAction} from "../action/GetUserInformationAction";

import {properties} from "../../common/config/properties";
import axios from "axios";
import {createUser} from "../process/UserCreationProcess";
import logger from "../../../tools/log";

export function getUserInformationOut(loginUser) {
    return (dispatch) => {

        var headers = {

            'Content-Type': 'application/json',

        };

        var url = properties.serverUrl + properties.user + properties.get_userinformation + "/" + loginUser.sso.username;


        var log = {
            action: "GET_USER_INFORMATION"
            , information: "getUserInformationOut(loginUser)"

            , "loginUser": loginUser

        };
        logger.debug(log);


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

    var log = {
        action: "GET_USER_INFORMATION"
        , information: "getUserInformationIn(contents)"

        , "contents": contents

    };
    logger.debug(log);
    const action=  getUserInformationAction(contents);
    return action;

}
