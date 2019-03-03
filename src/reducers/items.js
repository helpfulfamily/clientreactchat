export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function items(state = [], action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.items;

        case 'CONTENT_ADD_SUCCESS':{
            if( action.item.description=="success"){
                return   [

                    action.item.payloadObject.title,
                    ...state,
                ]
            }

        }
        default:
            return state;
    }
}
export function item(state={}, action) {
    switch (action.type) {
        case 'CONTENT_ADD_SUCCESS':{

            console.log("itemITEM:");
            console.log(action.item);
            return  action.item.payloadObject.title;

        }
        default:
            return state;
    }
}
