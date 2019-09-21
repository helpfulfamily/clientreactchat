import {appendChannelContentsAction, channelContentsHasErrored} from "../action/ChannelContentAction";
import {properties} from "../../../common/config/properties";
import axios from "axios";
import logger from "../../../../tools/log";

export function appendChannelContentsOut(channelName, pageNumber) {
    var url= properties.channel_contents+  channelName+ "/"+ pageNumber;
    return (dispatch) => {

        var headers = {

            'Content-Type': 'application/json',

        };
        var log = {
            action: "APPEND_CHANNEL_CONTENTS"
            , information: "appendChannelContentsOut(channelName, pageNumber)"

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
                    dispatch(appendChannelContentsIn(contents));
                }



            })

            .catch(() => dispatch(channelContentsHasErrored(true)));

    };
}

export function appendChannelContentsIn(contents) {

    var log = {
        action: "APPEND_CHANNEL_CONTENTS"
        , information: "appendChannelContentsIn(contents)"

        , "contents": contents
    };
    logger.debug(log);

    const action=  appendChannelContentsAction(contents);
    return action;

}
