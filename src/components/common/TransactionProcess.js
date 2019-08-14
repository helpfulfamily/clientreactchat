import axios from "axios";
import {properties} from "../../config/properties";
import {getToken} from "./process";
// Transaction göndermek için token alıp, transaction gönderme işlemini çağıran fonksiyon.
export   function getTokenForSendTransaction(keycloak, transaction)
{
    //Transaction yapmaya izin olup olmadığı anlaılsın diye, token alıyor.
    getToken(keycloak)

    // Token alındı ise, startTransaction fonksiyonu çağrılarak, transaction gönderme işlemi başlatılır.
        .then( (token) => startTransaction(token, transaction))
        // Eğer token alınırken bir hata oluştu ise, catch içerisinde o hata ekrana yazılıyor.
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