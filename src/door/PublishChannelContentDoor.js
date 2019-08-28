import {properties} from "../config/properties";
import axios from "axios";
import {publishChannelContentAction} from "../actions/channel/PublishChannelContentAction";


export function publishChannelContentOut(content, token)  {
    var url= properties.channel_publishContent;
    var bearer=  ' Bearer ' +  token;
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': bearer,
        'Access-Control-Allow-Origin': '*'
    }



    axios.post(url, content, {headers: headers})

        .then( (response)  => {
            if (!response.status) {
                throw Error(response.statusText);
            }

        });


}

export function publishChannelContentIn(data, store) {
    data= JSON.parse(data.body);




    if(typeof data !="undefined"){
        var payload= data.payload;
        if(typeof payload !="undefined"){

            var action = publishChannelContentAction(payload);
                    store.dispatch(action);


        }

    }


}
