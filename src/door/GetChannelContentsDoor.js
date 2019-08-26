import {
    getChannelContentsAction,
    channelContentsHasErrored
} from "../actions/channel/ChannelContentAction";
import {properties} from "../config/properties";
import axios from "axios";

export function getChannelContentsOut(channelName, pageNumber) {
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
                    dispatch(getChannelContentsIn(contents));
                }



            })

            .catch(() => dispatch(channelContentsHasErrored(true)));

    };
}

export function getChannelContentsIn(contents) {
    const action=  getChannelContentsAction(contents);
    return action;

}
