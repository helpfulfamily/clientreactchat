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
