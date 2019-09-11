import {properties} from "../../config/properties";
import axios from "axios";

export function createUser(user){
    var headers = {

        'Content-Type': 'application/json',

    }
    var url= properties.serverUrl+ properties.user+"/create";

    axios.post(url, user,{headers: headers})


        .then( (response) =>  {

            console.log("user created");


        });

}