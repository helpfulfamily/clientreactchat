import {combineReducers} from 'redux';
import {
    problemTitleHasErrored,
    problemTitleIsLoading,
    problemTitleReducer
} from '../../../components/chat/channel/reducer/ProblemTitleReducer';
import {
    channelObserverListReducer,
    userHasErrored,
    userIsLoading,
    userListArrived
} from '../../../components/chat/channel/reducer/ChannelObserverListReducer';

import {
    channelContentsHasErrored,
    channelContentsReducer
} from '../../../components/chat/channel/reducer/ChannelContentsReducer';

import {
    dialogContentsHasErrored,
    dialogContentsReducer
} from '../../../components/chat/dialog/reducer/DialogContentsReducer';

import {userInformationReducer} from '../../../components/user/reducer/UserInformationReducer';
import {isWebSocketConnected} from '../../websocket/reducer/WebSocketReducer';

import {
    channel,
    channelHasErrored,
    channelIsLoading,
    channelReducer
} from '../../../components/chat/channel/reducer/ChannelReducer';

export default combineReducers({

    channel: channel,
    channels: channelReducer,
    channelHasErrored,
    channelIsLoading,
    users: channelObserverListReducer,
    userHasErrored,
    userIsLoading,
    problemTitles: problemTitleReducer,
    problemTitleHasErrored,
    problemTitleIsLoading,
    channelContents: channelContentsReducer,
    channelContentsHasErrored,
    dialogContents: dialogContentsReducer,
    dialogContentsHasErrored,
    userInformationReducer,
    onlineUserList:userListArrived,
    isWebSocketConnected: isWebSocketConnected


});
