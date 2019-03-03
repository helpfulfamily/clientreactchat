import axios from "axios";

export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}
export function itemsAddSuccess(item) {
    return {
        type: 'CONTENT_ADD_SUCCESS',
        item
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
      var headers = {

            'Content-Type': 'application/json',

        }

        axios.get(url, {headers: headers, params: { }})

            .then( (response)  => {
                if (!response.status) {
                    throw Error(response.statusText);
                }
                dispatch(itemsFetchDataSuccess(response.data))
            })
            .catch( (error)  => {
                dispatch(itemsHasErrored(true));
            })
            .then( () =>  {


                dispatch(itemsIsLoading(false));

            });
    };
}
function dispatcherHa(data){
    var actionType= data.type;
    var action;
    switch (actionType) {
        case 'CONTENT_ADD_SUCCESS':{

            action= itemsAddSuccess(data);
        }
    }

   return action;
}
export function itemsPostData(url, item) {
    return (dispatch) => {
        var headers = {

            'Content-Type': 'application/json',

        }

        axios.post(url, item,{headers: headers})

            .then( (response)  => {
                if (!response.status) {
                    throw Error(response.statusText);
                }
                dispatch(dispatcherHa(response.data));
            })
            .catch( (error)  => {
              //  dispatch(itemsHasErrored(true));
            })
            .then( () =>  {


              //  dispatch(itemsIsLoading(false));

            });
    };
}
