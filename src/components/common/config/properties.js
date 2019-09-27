properties = {
        notificationUrl: process.env.REACT_APP_NOTIFICATION_SERVICE_URL,
        serverUrl: process.env.REACT_APP_SERVICE_URL,


        channel_publishContent: process.env.REACT_APP_SERVICE_URL+ process.env.REACT_APP_CHANNEL+ process.env.REACT_APP_PUBLISH_CHANNEL_CONTENT,
        dialog_publishContent: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_DIALOG + process.env.REACT_APP_PUBLISH_DIALOG_CONTENT,
        channel_contents:process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_CHANNEL + process.env.REACT_APP_CONTENTS,
        dialog_contents:process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_DIALOG + process.env.REACT_APP_CONTENTS,
        channel_by_name: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_CHANNEL,
        channel_create: process.env.REACT_APP_SERVICE_URL+ process.env.REACT_APP_CHANNEL + process.env.REACT_APP_CREATE_CHANNEL,

        user: process.env.REACT_APP_USER,
        get_userinformation: process.env.REACT_APP_GETUSERINFORMATION,
        users_all:  process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_USER + process.env.REACT_APP_ALL,
        changeProfilePhotoUrl: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_USER+ process.env.REACT_APP_CHANGE_PROFILE_PHOTO_URL,
        changeCoverUrl: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_USER+ process.env.REACT_APP_CHANGE_PROFILE_COVER_URL
};
export var properties;
