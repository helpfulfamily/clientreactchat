import axios from "axios";


export function problemTitleHasErrored(bool) {
    return {
        type: 'PROBLEM_TITLE_HAS_ERRORED',
        hasErrored: bool
    };
}

export function problemTitleIsLoading(bool) {
    return {
        type: 'PROBLEM_TITLE_IS_LOADING',
        isLoading: bool
    };
}

export function problemTitleFetchDataSuccess(problemTitles) {
    return {
        type: 'PROBLEM_TITLE_FETCH_DATA_SUCCESS',
        problemTitles
    };
}
export function publishProblemSuccess(item) {
    return {
        type: 'PUBLISH_PROBLEM_CONTENT',
        item
    };
}

export function problemTitleFetchData(url) {
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
                    dispatch(problemTitleFetchDataSuccess(response.data))
                }

            })
            .catch( (error)  => {
                dispatch(problemTitleHasErrored(true));
            })
            .then( () =>  {


                dispatch(problemTitleIsLoading(false));

            });
    };
}

export default function dispatcherHaProblemContent(data, store){
    data= JSON.parse(data.body);
    var publishContent= data.headers.publishProblemContent;

    var action;

 
        switch (publishContent) {
            case 'SUCCESS':{

                action= publishProblemSuccess(data);
            }
        }
       store.dispatch(action);


}
export function publishProblem(url, item, token) {
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
