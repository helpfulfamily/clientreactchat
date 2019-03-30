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
            var data= action.item;
            var firstContent= data.payload.firstContent;
            if(firstContent){
                return   [

                    data.payload.title,
                    ...state,
                ]

            }else{
                return state;
            }
        }
        default:
            return state;
    }
}
export function item(state={}, action) {
    switch (action.type) {
        case 'CONTENT_ADD_SUCCESS':{


            return  action.item.payload.title;

        }
        default:
            return state;
    }
}
