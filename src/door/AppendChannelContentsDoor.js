import {
    appendChannelContentsAction,
    channelContentsHasErrored
} from "../actions/channel/ChannelContentAction";
import {properties} from "../config/properties";
import axios from "axios";

export function appendChannelContentsOut(channelName, pageNumber) {
    var url= properties.channel_contents+  channelName+ "/"+ pageNumber;
    return (dispatch) => {

        var headers = {

            'Content-Type': 'application/json',

        }

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
    const action=  appendChannelContentsAction(contents);
    return action;

}
