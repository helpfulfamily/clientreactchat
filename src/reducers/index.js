import { combineReducers } from 'redux';
import { problemTitleReducer, problemTitleHasErrored, problemTitleIsLoading} from './channel/ProblemTitleReducer';
import { userListArrived, userReducer, userHasErrored, userIsLoading} from './user/UserReducer';

import { channelContentsReducer, channelContentsHasErrored, channelContentsIsLoading } from './channel/ChannelContentsReducer';
import { loginReducer} from './sso';
import { isWebSocketConnected} from './WebSocketReducer';

import { channel, channelReducer, channelHasErrored, channelIsLoading} from './channel/ChannelReducer';

import {reducer as notificationsReducer} from 'reapop';

export default combineReducers({

    notifications: notificationsReducer(),
    channel: channel,
    channels: channelReducer,
    channelHasErrored,
    channelIsLoading,
    users: userReducer,
    userHasErrored,
    userIsLoading,
    problemTitles: problemTitleReducer,
    problemTitleHasErrored,
    problemTitleIsLoading,
    channelContents: channelContentsReducer,
    channelContentsHasErrored,

    loginReducer,
    onlineUserList:userListArrived,
    isWebSocketConnected: isWebSocketConnected


});
