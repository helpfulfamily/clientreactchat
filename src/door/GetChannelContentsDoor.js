import {channelContentsHasErrored, getChannelContentsAction} from "../actions/channel/ChannelContentAction";
import {properties} from "../config/properties";
import axios from "axios";
import logger from "../tools/log";

export function getChannelContentsOut(channelName, pageNumber) {
    var url= properties.channel_contents+  channelName+ "/"+ pageNumber;
    return (dispatch) => {

        var headers = {

            'Content-Type': 'application/json',

        }

        var log = {
            action: "GET_CHANNEL_CONTENTS"
            , information: "getChannelContentsOut(channelName, pageNumber)"

            , "channelName": channelName
            , "pageNumber": pageNumber
        };
        logger.debug(log);

        axios.get(url,{headers: headers})
            .then((response) => {
                if (response.status!=200) {
                    throw Error(response.statusText);
                }else {
                    const contents=  response.data;
                    dispatch(getChannelContentsIn(contents));
                }



            })

            .catch(() => dispatch(channelContentsHasErrored(true)));

    };
}

export function getChannelContentsIn(contents) {

    var log = {
        action: "GET_CHANNEL_CONTENTS"
        , information: "getChannelContentsIn(contents)"

        , "contents": contents

    };
    logger.debug(log);

    const action=  getChannelContentsAction(contents);
    return action;

}
