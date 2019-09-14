import {getToken} from "./process";
import {observationChannelOut} from "../../door/ObservationChannelDoor";
import {notify} from "reapop";

export function sendObservationRequestSignal(keycloak, observation)
{
    getToken(keycloak).then( (token) => observationChannelOut(token, observation))
        .catch(function(hata){

            console.log(hata)
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

        store.dispatch(   notify({
            title: "Observation",
            message: notificationMessage,

            status: "success",
            dismissible: false,
            dismissAfter: 0,
            buttons: [{
                name: 'OK',
                primary: true
            } ],
            allowHTML: true
        }));


    }
}