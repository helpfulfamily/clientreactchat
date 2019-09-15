import {properties} from "../../config/properties";
import axios from "axios";
import logger from "../../tools/log/index";

export function createUser(user){
    var headers = {

        'Content-Type': 'application/json',

    }
    var url= properties.serverUrl+ properties.user+"/create";

    axios.post(url, user,{headers: headers})


        .then( (response) =>  {

            logger.info("user created");


        });

}