import axios from "axios";
import {properties} from "../../config/properties";
import {getToken} from "./process";


/*

Transaction metoduna receiver ve objectId olmak üzere iki parametre girilmiştir.

                receiver: Thankcoin'in transfer edileceği kullanıcı.
    objectId: Thankcoin transfer edilecek olan nesnenin id'si. (Veritabanındaki, kimlik numarası)

    Thankcoin aktarma işlemi için gereken veriyi hazırlar.

        Bu veri, transaction adında bir JSON objesidir ve  ThankcoinPanel.js içerisindeki getTokenForSendTransaction() fonksiyonu aracılığı ile
    bir (Gateway'deki bir) REST servisine aktarılır.
    Örneğin gene bu component içerisinde şu kod ile çağırılmıştır;
    <ThankcoinPanel transaction={ this.getTransaction(content.user.username, content.id)}  ... />

*/

    export function getTransaction(receiver, objectId, objectType, name) {

        var transaction = {
            receiver: {
            username: receiver
        },
        objectType: objectType,    // Transfer işlemi yapılacak nesnenin türü. (örn: "Channel", "User" veya "ChannelContent" türünde nesne)
        objectId: objectId,
        name: name
    }
    return transaction

}



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


}

//Aşağıda bearer + token ve headers değişkeni tanımlanıyor.
function startTransaction(token, transaction){
    var bearer=  ' Bearer ' +   token;
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': bearer,
        'Access-Control-Allow-Origin': '*'
    }


    /*

    Axios bir kütüphanedir. Kütüphaneler, birçok componentin bulunduğu bir depo gibidir.
    Axios; get, post, delete, update gibi birçok işlemin daha kolay yapılmasını sağlar.
    Burada ise axios, post isteği için kullanılmıştır zira Gateway modülündeki  method
    aşağıdaki gibi POST türünde tanımlanmıştır:

    @PostMapping(value = "/sendThankCoin", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

    Bu post çağrısını Chrome-> Inspect -> Network kısmında izleyebilirsiniz.
    Bunun için, herhangi bir Thank buttonuna basıp, Thankcoin transfer etmeniz yeterlidir.
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