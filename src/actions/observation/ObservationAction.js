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

function  loginPromiseResolved(loginUser, store, notificationMessage, observaton) {
    var objectType=observaton.objectType;

    var notificationMessage="";

    switch (objectType) {


        case 'Channel':{

             notificationMessage= "You are an observer of this channel now!";


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