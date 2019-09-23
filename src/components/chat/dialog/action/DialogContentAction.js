export function dialogContentsHasErrored(bool) {
    return {
        type: 'DIALOG_CONTENTS_HAS_ERRORED',
        hasErrored: bool
    };
}


export function transactionDialogContentAction(transaction) {
    return {
        type: 'TRANSACTION_DIALOG_CONTENT',
        transaction
    };
}

export function getDialogContentsAction(dialogContents) {
    return {
        type: 'GET_DIALOG_CONTENTS',
        dialogContents
    };
}
export function appendDialogContentsAction(dialogContents) {
    return {
        type: 'APPEND_DIALOG_CONTENTS',
        dialogContents
    };
}

