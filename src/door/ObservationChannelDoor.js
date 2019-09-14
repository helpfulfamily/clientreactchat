import {properties} from "../config/properties";
import axios from "axios";
import {observationChannelAction} from "../actions/observation/ObservationChannelAction";

export function observationChannelOut(token, observation){
    var bearer=  ' Bearer ' +   token;
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': bearer,
        'Access-Control-Allow-Origin': '*'
    }



    axios.post(properties.serverUrl+"/observation/sendObservationRequestSignal", observation, {headers: headers})

        .then( (response)  => {
            if (!response.status) {
                throw Error(response.statusText);
            }


        });
}


export function observationChannelIn(observation) {

    var action = observationChannelAction(observation);

    return action;

}
