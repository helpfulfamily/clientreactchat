import {properties} from "../../../common/config/properties";
import axios from "axios";
import {publishDialogContentAction} from "../action/PublishDialogContentAction";
import logger from "../../../../tools/log";


export function publishDialogContentOut(content, token)  {
    var url= properties.dialog_publishContent;
    var bearer=  ' Bearer ' +  token;
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': bearer,
        'Access-Control-Allow-Origin': '*'
    };

    var log = {
        action: "PUBLISH_DIALOG_CONTENT"
        , information: "publishDialogContentOut(content, token)"

        , "content": content
        , "token": token
    };
    logger.debug(log);


    axios.post(url, content, {headers: headers})

        .then( (response)  => {
            if (!response.status) {
                throw Error(response.statusText);
            }

        });


}

export function publishDialogContentIn(data, store) {
    data= JSON.parse(data.body);

    var log = {
        action: "PUBLISH_DIALOG_CONTENT"
        , information: "publishDialogContentIn(data, store)"

        , "data": data
        , "store": store
    };
    logger.debug(log);


    if(typeof data !="undefined"){


        var payload= data.payload;
        if(typeof payload !="undefined"){

            var action = publishDialogContentAction(payload);
            store.dispatch(action);


        }

    }


}
