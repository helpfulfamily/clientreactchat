import {properties} from "../../config/properties";
import axios from "axios";

export function getOnlineUserList(username, actionType, channelName){


    var headers = {

        'Content-Type': 'application/json',

    }

    var url= properties.serverUrl+ properties.user+ "/userChannelJoinPart/" +username+ "/"+ channelName + "/" + actionType;

    axios.get(url,{headers: headers})
        .then( (response) =>  {

        })
        .catch( (error)  => {

        });

}

