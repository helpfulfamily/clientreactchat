import axios from "axios";
import { properties } from '../../config/properties.js';

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


export   function sendTransaction(keycloak, transaction)
{
    getToken(keycloak).then( (token) => startTransaction(token, transaction))
    .catch(function(hata){

        console.log(hata)
    });


}
function startTransaction(token, transaction){
    var bearer=  ' Bearer ' +   token;
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': bearer,
        'Access-Control-Allow-Origin': '*'
    }



    axios.post(properties.serverUrl+"/transaction/sendThankCoin", transaction, {headers: headers})

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
export function getToken(keycloak)
{
    return   new Promise(function(resolve, reject) {
    var isExpired = keycloak.isTokenExpired();
    var token = keycloak.token;

    if (isExpired) {
        keycloak.updateToken(5)
            .success(function() {

                // UPDATE THE TOKEN
                token = keycloak.token;
                resolve(token);

            })
            .error(function() {
                reject('Failed to refresh token');
            });
    }else{

        resolve(token);
    }
    });

}