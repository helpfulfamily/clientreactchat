import axios from "axios";

import {toast} from "react-toastify";


export function dialogHasErrored(bool) {
    return {
        type: 'DIALOG_HAS_ERRORED',
        hasErrored: bool
    };
}

export function dialogIsLoading(bool) {
    return {
        type: 'DIALOG_IS_LOADING',
        isLoading: bool
    };
}


export function dialogChanged(dialog) {
    return {
        type: 'DIALOG_CHANGED',
        dialog
    };
}
export function dialogCreated(dialog) {
    return {
        type: 'DIALOG_CREATED',
        dialog
    };
}

export function dialogGetByName(url, senderID, recevierID, pageNumber) {
    return (dispatch) => {
        var headers = {

            'Content-Type': 'application/json',

        };

        axios.get(url+dialogName, {headers: headers, params: { }})

            .then( (response)  => {
                if (!response.status) {
                    throw Error(response.statusText);
                }
                if(response.data==""){
                    dispatch(dialogChanged({name:dialogName}))

                }else{
                    dispatch(dialogChanged(response.data))
                }



            })
            .catch( (error)  => {
                dispatch(dialogHasErrored(true));
            })
            .then( () =>  {


                dispatch(dialogIsLoading(false));

            });
    };
}


export function createDialog (url, item, token) {
    var bearer = ' Bearer ' + token;
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': bearer,
        'Access-Control-Allow-Origin': '*'
    };


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
export   function dispatcherDialog(data, store){

    var body=  JSON.parse(data.body);
    var payload= body.payload;
    var name= payload.name;

    var  notificationMessage="Dialog " + name +  " created.";

    toast(notificationMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
    });
    var action= dialogCreated(payload);
    store.dispatch(action)


}