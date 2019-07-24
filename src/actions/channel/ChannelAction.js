import axios from "axios";
import {notify} from "reapop";
import defaultavatar from "../../components/user/default-avatar.png";


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


export function channelChanged(channel) {
    return {
        type: 'CHANNEL_CHANGED',
        channel
    };
}
export function channelCreated(channel) {
    return {
        type: 'CHANNEL_CREATED',
        channel
    };
}

export function channelGetByName(url, channelName) {
    return (dispatch) => {
        var headers = {

            'Content-Type': 'application/json',

        }

        axios.get(url+channelName, {headers: headers, params: { }})

            .then( (response)  => {
                if (!response.status) {
                    throw Error(response.statusText);
                }
                if(response.data==""){
                    dispatch(channelChanged({name:channelName}))

                }else{
                    dispatch(channelChanged(response.data))
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


export function createChannel(url, item, token) {
    var bearer = ' Bearer ' + token;
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': bearer,
        'Access-Control-Allow-Origin': '*'
    }


    axios.post(url, item, {headers: headers})

        .then((response) => {
            if (!response.status) {
                throw Error(response.statusText);
            }

        })
        .catch((error) => {

        })
        .then(() => {


        });




}
export   function dispatcherChannel(data, store){
    console.log(data);
    var body=  JSON.parse(data.body);
    var payload= body.payload;
    var name= payload.name;

    var  notificationMessage="Channel " + name +  " created.";
    store.dispatch(   notify({
        title: "Thank you!",
        message: notificationMessage,
        image: defaultavatar,
        status: "success",
        dismissible: false,
        dismissAfter: 0,
        buttons: [{
            name: 'OK',
            primary: true
        } ],
        allowHTML: true
    }));

    var action= channelCreated(payload);
    store.dispatch(action)


}