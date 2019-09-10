import axios from "axios";
import { properties } from '../config/properties.js';
export function loginAction(user) {
    console.log("user:", user);
    return {
        type: 'GET_USER_INFORMATION',
        user
    };
}

export function loginActionDispatcher(loginUser) {
    return (dispatch) => {
        var headers = {

            'Content-Type': 'application/json',

        }

        var url= properties.serverUrl+ properties.user+ "/"+loginUser.sso.username;

        axios.get(url,{headers: headers})
            .then( (response) =>  {
                if(response.data!==""){

                    var sso= loginUser.sso;
                    loginUser= response.data;
                    loginUser.sso= sso;
                }else{
                    createUser(loginUser.sso);

                }

                dispatch(loginAction(loginUser));




            })
            .catch( (error)  => {

            });

    };

    function createUser(user){
        var headers = {

            'Content-Type': 'application/json',

        }
        var url= properties.serverUrl+ properties.user+"/create";

        axios.post(url, user,{headers: headers})


            .then( (response) =>  {

                console.log("user created");


            });

    }

}
