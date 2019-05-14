import * as Keycloak from "keycloak-js";

const keycloak = Keycloak('/keycloak.json');

export  function getLoginUser() {
 return   new Promise(function(resolve, reject) {

     var returnValue=null;
     var initOptions = {
         responseMode: 'fragment',
         flow: 'standard',
         onLoad: 'check-sso'
     };
     keycloak.init(initOptions).success((authenticated) => {

         var username="";
         if(typeof keycloak.idTokenParsed !=="undefined"){
             username= keycloak.idTokenParsed.preferred_username;

             var sso = {isAuthenticated: authenticated, username: username, keycloak: keycloak }
             returnValue = {"sso": sso};
         }

         resolve(returnValue);
     }).error(function () {
         reject("error");
     });

 });

}

export function login() {


    keycloak.login();

}
export function  logout() {


    keycloak.logout();
}