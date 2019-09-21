import {properties} from "../../common/config/properties";
import axios from "axios";
import {transactionChannelContentAction} from "../../chat/channel/action/ChannelContentAction";
import logger from "../../../tools/log";


//Aşağıda bearer + token ve headers değişkeni tanımlanıyor.
export function transactionChannelContentOut(token, transaction){

    var bearer=  ' Bearer ' +   token;
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': bearer,
        'Access-Control-Allow-Origin': '*'
    };

    var log= {action: "TRANSACTION_CHANNEL_CONTENT"
        , information:"transactionChannelContentOut(token, transaction)"
        , "token": token
        , "transaction": transaction
    };
    logger.debug(log);

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

export function transactionChannelContentIn(transaction, store) {


            var log= {action: "TRANSACTION_CHANNEL_CONTENT"
                , information:"transactionChannelContentIn(transaction, store)"
                , "transaction": transaction
                , "store": store
                };

            logger.debug(log);


            var action = transactionChannelContentAction(transaction);

             store.dispatch(action);



}
