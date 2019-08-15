import axios from "axios";
import {properties} from "../../config/properties";
import {getToken} from "./process";

     // Transaction göndermek için token alıp, transaction gönderme işlemini çağıran fonksiyon.

export   function getTokenForSendTransaction(keycloak, transaction)
{
    //Transaction yapmaya izin olup olmadığı anlaşılsın diye, token alıyor.
    getToken(keycloak)

    // Token alındı ise, startTransaction fonksiyonu çağrılarak, transaction gönderme işlemi başlatılır.

        .then( (token) => startTransaction(token, transaction))

        // Eğer token alınırken bir hata oluştu ise, catch içerisinde o hata ekrana yazılıyor.

        .catch(function(hata){

            console.log(hata)
        });


}       //Aşağıda bearer + token ve headers değişkeni tanımlanıyor.

function startTransaction(token, transaction){
    var bearer=  ' Bearer ' +   token;
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': bearer,
        'Access-Control-Allow-Origin': '*'
    }


    /*

    Axios bir kütüphanedir. Kütüphaneler, birçok componentin bulunduğu bir depo gibidir.
    Axios ile get, post, delete, update gibi birçok işlemin daha kolay yapılmasını sağlar.
    Burada ise axios, post isteği için kullanılmıştır.

    */

    axios.post(properties.serverUrl+"/transaction/sendThankCoin", transaction, {headers: headers})


         //(Response burada ne işe yarıyor anlamadım. Aldığı parametreye göre görevi değişiyor sanırım. Anlamadım.)

        .then( (response)  => {
            if (!response.status) {
                throw Error(response.statusText);
            } //  Eğer response edilemiyorsa hata verecek.
            if(response.data!==""){

            } // Eğer response edilebiliyorsa datadan çekilen veri dönderilecek.

        })
        .catch( (error)  => {

        })
        .then( () =>  {




        });
}