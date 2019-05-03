properties = {
        notificationUrl: process.env.REACT_APP_NOTIFICATION_SERVICE_URL,
        serverUrl: process.env.REACT_APP_SERVICE_URL,

        problemtitle_publishContent: process.env.REACT_APP_SERVICE_URL+ process.env.REACT_APP_PROBLEM_TITLE + process.env.REACT_APP_PUBLISH_PROBLEM_CONTENT,
        problemtitle_all: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_PROBLEM_TITLE + process.env.REACT_APP_ALL,
        problemtitle_contents:process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_PROBLEM_TITLE + process.env.REACT_APP_CONTENTS,

        solutiontitle_publishContent: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_SOLUTION_TITLE + process.env.REACT_APP_PUBLISH_SOLUTION_CONTENT,
        solutiontitle_all: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_SOLUTION_TITLE + process.env.REACT_APP_ALL,
        solutiontitle_contents: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_SOLUTION_TITLE + process.env.REACT_APP_CONTENTS,
        channels_all: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_CHANNEL + process.env.REACT_APP_ALL,

        user: process.env.REACT_APP_USER,
        changeProfilePhotoUrl: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_USER+ process.env.REACT_APP_CHANGE_PROFILE_PHOTO_URL,
        changeCoverUrl: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_USER+ process.env.REACT_APP_CHANGE_PROFILE_COVER_URL
};
export var properties;