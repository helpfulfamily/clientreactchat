import { combineReducers } from 'redux';
import { problemTitleReducer, problemTitleHasErrored, problemTitleIsLoading} from './channel/ProblemTitleReducer';
import { userReducer, userHasErrored, userIsLoading} from './user/UserReducer';

import { channelContentReducer, channelContentsHasErrored, channelContentsIsLoading } from './channel/ProblemContentReducer';
import { loginReducer} from './sso';


import {reducer as notificationsReducer} from 'reapop';

export default combineReducers({

    notifications: notificationsReducer(),

    users: userReducer,
    userHasErrored,
    userIsLoading,
    problemTitles: problemTitleReducer,
    problemTitleHasErrored,
    problemTitleIsLoading,
    channelContents: channelContentReducer,
    channelContentsHasErrored,
    channelContentsIsLoading,
    loginReducer


});
