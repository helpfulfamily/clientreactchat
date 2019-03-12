import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading, item} from './items';
import { contents, contentsHasErrored, contentsIsLoading } from './contents';
import { logoutReducer, loginReducer} from './sso';
export default combineReducers({
    item,
    items,
    itemsHasErrored,
    itemsIsLoading,
    contents,
    contentsHasErrored,
    contentsIsLoading,
    logoutReducer,
    loginReducer

});
