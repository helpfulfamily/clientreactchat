import {appendDialogContentsAction, dialogContentsHasErrored} from "../action/DialogContentAction";
import {properties} from "../../../common/config/properties";
import axios from "axios";
import logger from "../../../../tools/log";

export function appendDialogContentsOut(token, receiverID, pageNumber) {

    var url = properties.dialog_contents + receiverID + "/" + pageNumber;
    return (dispatch) => {

        var bearer = ' Bearer ' + token;
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': bearer,
            'Access-Control-Allow-Origin': '*'
        };
        var log = {
            action: "APPEND_DIALOG_CONTENTS"
            , information: "appendDialogContentsOut(token, receiverID, pageNumber)"
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
                    dispatch(appendDialogContentsIn(contents));
                }



            })

            .catch(() => dispatch(dialogContentsHasErrored(true)));

    };
}

export function appendDialogContentsIn(contents) {

    var log = {
        action: "APPEND_DIALOG_CONTENTS"
        , information: "appendDialogContentsIn(contents)"

        , "contents": contents
    };
    logger.debug(log);

    const action=  appendDialogContentsAction(contents);
    return action;

}
