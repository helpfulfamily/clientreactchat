import {dialogContentsHasErrored, getDialogContentsAction} from "../action/DialogContentAction";
import {properties} from "../../../common/config/properties";
import axios from "axios";
import logger from "../../../../tools/log";

export function getDialogContentsOut(token, receiverID, pageNumber) {
    var url = properties.dialog_contents + receiverID + "/" + pageNumber;
    return (dispatch) => {
        var bearer = ' Bearer ' + token;
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': bearer,
            'Access-Control-Allow-Origin': '*'
        };
        var log = {
            action: "GET_DIALOG_CONTENTS"
            , information: "getDialogContentsOut (senderID, receiverID, pageNumber)"
            , "receiverID": receiverID
            , "pageNumber": pageNumber
        };
        logger.debug(log);

        axios.get(url,{headers: headers})
            .then((response) => {
                if (response.status!=200) {
                    throw Error(response.statusText);
                }else {
                    const contents=  response.data;
                    dispatch(getDialogContentsIn(contents));
                }



            })

            .catch(() => dispatch(dialogContentsHasErrored(true)));

    };
}

export function getDialogContentsIn(contents) {

    var log = {
        action: "GET_DIALOG_CONTENTS"
        , information: "getDialogContentsIn(contents)"

        , "contents": contents

    };
    logger.debug(log);

    const action=  getDialogContentsAction(contents);
    return action;

}
