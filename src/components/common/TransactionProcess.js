import {getToken} from "./process";
import {transactionChannelContentOut} from "../../door/TransactionChannelContentDoor";
import {transactionChannelOut} from "../../door/TransactionChannelDoor";


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

        .then( (token) => {

            var objectType= transaction.objectType;

             if(objectType== "Channel"){

                  transactionChannelOut(token, transaction)

             }else if (objectType== "ChannelContent") {

                  transactionChannelContentOut(token, transaction)
        }

        } )

        // Eğer token alınırken bir hata oluştu ise, catch içerisinde o hata ekrana yazılıyor.

        .catch(function(hata){

            console.log(hata)
        });


}
