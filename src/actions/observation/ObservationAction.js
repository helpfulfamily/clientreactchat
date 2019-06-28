import {notify} from 'reapop';
import {getLoginUser} from "../../components/common/LoginProcess";


export function observationChannel(observaton) {
    return {
        type: 'OBSERVATION_CHANNEL',
        observaton
    };
}
export default function dispatcherObservation(data, store){


    var observaton=JSON.parse(data.body);
    observaton= observaton.payload;

    var objectType=observaton.objectType;

    var action;
    var notificationMessage="";



        switch (objectType) {
            case 'Channel':{

                action= observationChannel(observaton);
                break;
            }
        }

    getLoginUser().then( (loginUser) => loginPromiseResolved(loginUser, store, notificationMessage, observaton))
        .catch(function(hata){

        console.log(hata)
    });


       store.dispatch(action);


}

function  loginPromiseResolved(loginUser, store, notificationMessage, observation) {
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