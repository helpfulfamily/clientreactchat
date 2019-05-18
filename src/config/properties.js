properties = {
        notificationUrl: process.env.REACT_APP_NOTIFICATION_SERVICE_URL,
        serverUrl: process.env.REACT_APP_SERVICE_URL,

        family_create: process.env.REACT_APP_SERVICE_URL+ process.env.REACT_APP_FAMILY + process.env.REACT_APP_CREATE_FAMILY,

        problemtitle_publishContent: process.env.REACT_APP_SERVICE_URL+ process.env.REACT_APP_PROBLEM_TITLE + process.env.REACT_APP_PUBLISH_PROBLEM_CONTENT,
        problemtitle_all: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_PROBLEM_TITLE + process.env.REACT_APP_ALL,
        problemtitle_contents:process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_PROBLEM_TITLE + process.env.REACT_APP_CONTENTS,

        solutiontitle_publishContent: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_SOLUTION_TITLE + process.env.REACT_APP_PUBLISH_SOLUTION_CONTENT,
        solutiontitle_all: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_SOLUTION_TITLE + process.env.REACT_APP_ALL,
        solutiontitle_contents: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_SOLUTION_TITLE + process.env.REACT_APP_CONTENTS,
        channels_all: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_CHANNEL + process.env.REACT_APP_ALL,
        channel_by_name: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_CHANNEL,
        user: process.env.REACT_APP_USER,
        users_all:  process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_USER + process.env.REACT_APP_ALL,
        changeProfilePhotoUrl: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_USER+ process.env.REACT_APP_CHANGE_PROFILE_PHOTO_URL,
        changeCoverUrl: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_USER+ process.env.REACT_APP_CHANGE_PROFILE_COVER_URL
};
export var properties;