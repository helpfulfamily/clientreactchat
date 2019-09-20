import {getToken} from "../common/LoginProcess";
import {observationChannelOut} from "../../door/ObservationChannelDoor";

import logger from "../../tools/log/index";
import {toast} from "react-toastify";

export function sendObservationRequestSignal(keycloak, observation)
{
    getToken(keycloak).then( (token) => observationChannelOut(token, observation))
        .catch(function(hata){

            logger.error(hata)
        });


}
export function  loginPromiseResolved(loginUser, store, notificationMessage, observation) {
    var objectType=observation.objectType;

    var notificationMessage="";

    switch (objectType) {


        case 'Channel':{
            if(observation.observe){
                notificationMessage= "You are an observer of #" +observation.channelName + " now!";
            }else {
                notificationMessage = "You unobserved  #" +observation.channelName + " now!";
            }



            break;
        }
    }

    if(loginUser!=null){
        toast(notificationMessage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true
        });



    }
}