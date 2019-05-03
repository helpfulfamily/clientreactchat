import axios from "axios";


export function channelHasErrored(bool) {
    return {
        type: 'CHANNEL_HAS_ERRORED',
        hasErrored: bool
    };
}

export function channelIsLoading(bool) {
    return {
        type: 'CHANNEL_IS_LOADING',
        isLoading: bool
    };
}

export function channelFetchDataSuccess(problemTitles) {
    return {
        type: 'CHANNEL_FETCH_DATA_SUCCESS',
        problemTitles
    };
}
export function channelChanged(channelName) {
    return {
        type: 'CHANNEL_CHANGED',
        channelName
    };
}


export function channelFetchData(url) {
    return (dispatch) => {
      var headers = {

            'Content-Type': 'application/json',

        }

        axios.get(url, {headers: headers, params: { }})

            .then( (response)  => {
                if (!response.status) {
                    throw Error(response.statusText);
                }
                if(response.data!==""){
                    dispatch(channelFetchDataSuccess(response.data))
                }

            })
            .catch( (error)  => {
                dispatch(channelHasErrored(true));
            })
            .then( () =>  {


                dispatch(channelIsLoading(false));

            });
    };
}

