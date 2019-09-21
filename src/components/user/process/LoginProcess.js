import * as Keycloak from "keycloak-js";

const keycloak = Keycloak('/keycloak.json');

export  function getLoginUser() {
 return   new Promise(function(resolve, reject) {
// load previous tokens, saved after successful login of keycloak success callback
     const token = localStorage.getItem('kc_token');
     const refreshToken = localStorage.getItem('kc_refreshToken');

     var returnValue=null;

     keycloak.init({ onLoad: 'check-sso', token, refreshToken }).success((authenticated) => {

         var username="";
         if(typeof keycloak.tokenParsed !=="undefined"){
             username= keycloak.tokenParsed.preferred_username;

             var sso = {isAuthenticated: authenticated, username: username, keycloak: keycloak};
             returnValue = {"sso": sso};
             localStorage.setItem('kc_token', keycloak.token);
             localStorage.setItem('kc_refreshToken', keycloak.refreshToken);
             localStorage.setItem('keycloakStorage',JSON.stringify(keycloak));
             resolve(returnValue);
         }


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
export function getToken(keycloak)
{

    return   new Promise(function(resolve, reject) {
        try {
            var isExpired = keycloak.isTokenExpired();
            var token = keycloak.token;

            if (isExpired) {
                keycloak.updateToken(5)
                    .success(function() {

                        // UPDATE THE TOKEN
                        token = keycloak.token;
                        resolve(token);

                    })
                    .error(function() {
                        reject('Failed to refresh token');
                    });
            }else{

                resolve(token);
            }
        }
        catch(err) {
           logout();
        }

    });

}