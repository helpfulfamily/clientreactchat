import { combineReducers } from 'redux';
import { items, itemsHasErrored, itemsIsLoading } from './items';
import { contents, contentsHasErrored, contentsIsLoading } from './contents';
export default combineReducers({
    items,
    itemsHasErrored,
    itemsIsLoading,
    contents,
    contentsHasErrored,
    contentsIsLoading
});
