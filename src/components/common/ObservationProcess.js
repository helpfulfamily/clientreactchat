import axios from "axios";
import {properties} from "../../config/properties";
import {getToken} from "./process";

export function sendObservationRequestSignal(keycloak, observation)
{
    getToken(keycloak).then( (token) => startObservationRequestSignal(token, observation))
        .catch(function(hata){

            console.log(hata)
        });


}
function startObservationRequestSignal(token, observation){
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
            if(response.data!==""){

            }

        })
        .catch( (error)  => {

        })
        .then( () =>  {




        });
}
