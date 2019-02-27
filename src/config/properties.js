import { profil } from '../config/profil.js';

properties = {
        serverUrl: process.env.REACT_APP_SERVICE_URL,
        getTitle:  process.env.REACT_APP_TITLE + process.env.REACT_APP_CONTENTS,
        getAllTitles: process.env.REACT_APP_TITLE + process.env.REACT_APP_ALL,
        createTitle: process.env.REACT_APP_SERVICE_URL + process.env.REACT_APP_TITLE + process.env.REACT_APP_CREATE

};
export var properties;