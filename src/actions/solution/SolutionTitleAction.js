import axios from "axios";

export function solutionTitleHasErrored(bool) {
    return {
        type: 'SOLUTION_TITLE_HAS_ERRORED',
        hasErrored: bool
    };
}

export function solutionTitleIsLoading(bool) {
    return {
        type: 'SOLUTION_TITLE_IS_LOADING',
        isLoading: bool
    };
}

export function solutionTitleFetchDataSuccess(solutionTitles) {
    return {
        type: 'SOLUTION_TITLE_FETCH_DATA_SUCCESS',
        solutionTitles
    };
}
export function publishSolutionSuccess(item) {
    return {
        type: 'PUBLISH_SOLUTION_CONTENT',
        item
    };
}

export function solutionTitleFetchData(url) {
    return (dispatch) => {
      var headers = {

            'Content-Type': 'application/json',

        }

        axios.get(url, {headers: headers, params: { }})

            .then( (response)  => {
                if (!response.status) {
                    throw Error(response.statusText);
                }
                if(response.data!==""){
                    dispatch(solutionTitleFetchDataSuccess(response.data))
                }

            })
            .catch( (error)  => {
                dispatch(solutionTitleHasErrored(true));
            })
            .then( () =>  {


                dispatch(solutionTitleIsLoading(false));

            });
    };
}

export default function dispatcherHaSolutionContent(data, store){
    data= JSON.parse(data.body);
    var publishContent= data.headers.publishSolutionContent;

    var action;

 
        switch (publishContent) {
            case 'SUCCESS':{

                action= publishSolutionSuccess(data);
            }
        }
       store.dispatch(action);


}
export function publishSolution(url, item, token) {
    var bearer=  ' Bearer ' +  token;
    var headers = {
        'Content-Type': 'application/json',
        'Authorization': bearer,
        'Access-Control-Allow-Origin': '*'
    }



    axios.post(url, item, {headers: headers})

        .then( (response)  => {
            if (!response.status) {
                throw Error(response.statusText);
            }

        })
        .catch( (error)  => {

        })
        .then( () =>  {




        });

}
