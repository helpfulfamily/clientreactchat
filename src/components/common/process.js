export function getToken(keycloak)
{
    return   new Promise(function(resolve, reject) {
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
    });

}