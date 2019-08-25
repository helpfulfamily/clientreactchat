import {
    channelContentsFetchDataSuccess,
    channelContentsHasErrored,
    channelContentsIsLoading
} from "../actions/channel/ChannelContentAction";
import {properties} from "../config/properties";

export function getChannelContentsOut(channelName, pageNumber) {
    var url= properties.channel_contents+  channelName+ "/"+ pageNumber;
    return (dispatch) => {
        dispatch(channelContentsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(channelContentsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((contents) => dispatch(getChannelContentsIn(contents)))
            .catch(() => dispatch(channelContentsHasErrored(true)));
    };
}

export function getChannelContentsIn(contents) {
    var action=  channelContentsFetchDataSuccess(contents);
    return action;

}
