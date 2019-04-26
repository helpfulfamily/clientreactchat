import axios from "axios";
import { properties } from '../../config/properties.js';


export default  function sendTransaction(keycloak, transaction)
{
    var bearer=  ' Bearer ' +   getToken(keycloak);
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

function getToken(keycloak)
{

    var isExpired = keycloak.isTokenExpired();
    var token = keycloak.token;

    if (isExpired) {
        keycloak.updateToken(5)
            .success(function() {

                // UPDATE THE TOKEN
                token = keycloak.token;
                return token;

            })
            .error(function() {
                console.error('Failed to refresh token');
            });
    }else{
        return token;

    }
}