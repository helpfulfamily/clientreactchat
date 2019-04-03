import axios from "axios";
import { properties } from '../config/properties.js';
export function loginAction(user) {
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
export function loginActionDispatcher(user) {
    return (dispatch) => {
        var headers = {

            'Content-Type': 'application/json',

        }

        var url= properties.serverUrl+ properties.user+ user.username;

        axios.get(url,{headers: headers})
            .then( (response) =>  {
                if(response.data==""){
                    createUser(user);
                }else{
                    user= response.data;
                    dispatch(loginAction(user));
                }


            })
            .catch( (error)  => {

            });

    };


}
 function createUser(user){
     var headers = {

         'Content-Type': 'application/json',

     }
     var url= properties.serverUrl+ properties.user+"create";

     axios.post(url, user,{headers: headers})


         .then( (response) =>  {

                 console.log("user created");


         });

 }