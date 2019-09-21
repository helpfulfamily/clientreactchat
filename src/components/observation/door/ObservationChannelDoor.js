import {properties} from "../../common/config/properties";
import axios from "axios";
import {observationChannelAction} from "../action/ObservationChannelAction";
import logger from "../../../tools/log";

export function observationChannelOut(token, observation){
    var bearer=  ' Bearer ' +   token;
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': bearer,
        'Access-Control-Allow-Origin': '*'
    };

    var log = {
        action: "OBSERVATION_CHANNEL"
        , information: "observationChannelOut(token, observation)"
        , "token": token
        , "observation": observation
    };
    logger.debug(log);


    axios.post(properties.serverUrl+"/observation/sendObservationRequestSignal", observation, {headers: headers})

        .then( (response)  => {
            if (!response.status) {
                throw Error(response.statusText);
            }


        });
}


export function observationChannelIn(observation) {

    var log = {
        action: "OBSERVATION_CHANNEL"
        , information: "observationChannelIn(observation)"

        , "observation": observation
    };
    logger.debug(log);

    var action = observationChannelAction(observation);

    return action;

}
