export function transactionProblemContent(transaction) {
    return {
        type: 'TRANSACTION_PROBLEM_CONTENT',
        transaction
    };
}

export function transactionSolutionContent(transaction) {
    return {
        type: 'TRANSACTION_SOLUTION_CONTENT',
        transaction
    };
}

export function transactionProblemTitle(transaction) {
    return {
        type: 'TRANSACTION_PROBLEM_TITLE',
        transaction
    };
}
export function transactionSolutionTitle(transaction) {
    return {
        type: 'TRANSACTION_SOLUTION_TITLE',
        transaction
    };
}
export default function dispatcherTransaction(data, store){


   var transaction=JSON.parse(data.body);
   transaction= transaction.payload;
   var objectType=transaction.objectType;

    var action;

 
        switch (objectType) {
            case 'ProblemContent':{

                action= transactionProblemContent(transaction);
                break;
            }
            case 'SolutionContent':{

                action= transactionSolutionContent(transaction);
                break;
            }
            case 'ProblemTitle':{

                action= transactionProblemTitle(transaction);
                break;
            }

            case 'SolutionTitle':{

                action= transactionSolutionTitle(transaction);
                break;
            }
        }
       store.dispatch(action);


}