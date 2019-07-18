import axios from "axios";
import { properties } from '../config/properties.js';
export function loginAction(user) {
    console.log("user:", user);
    return {
        type: 'USER_LOG_IN',
        user
    };
}
export function logoutAction(user) {
    return {
        type: 'USER_LOG_OUT',
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

                userLoggedIn(loginUser.sso.username);


            })
            .catch( (error)  => {

            });

    };
    function userLoggedIn(username){
        var headers = {

            'Content-Type': 'application/json',

        }

        var url= properties.serverUrl+ properties.user+ "/userLoggedIn/" +username;

        axios.get(url,{headers: headers})
            .then( (response) =>  {

            })
            .catch( (error)  => {

            });


    }
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
