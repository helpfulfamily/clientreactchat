export function loginReducer(userState = {}, action) {
    switch (action.type) {

        case 'USER_LOG_IN':
            if (typeof action.user !== 'undefined'){

                return action.user;
            }else{
                return userState;
            }

            return { ...userState };

        case 'OBSERVATION_CHANNEL':

                var user= userState;
                var observe= action.observation.observe;
                var channelName=  action.observation.channelName;
                var channelId=-1;
                if (typeof  user.channels == 'undefined'){
                    user.channels={};
                }

                if(observe){
                    action={id: action.observation.channelId,
                        name: channelName};

                    user.channels.push(action);
                }else{

                    if (typeof user.channels !== "undefined") {

                        var filtered = user.channels.filter(function(value, index, arr){

                            return value.name !== channelName;

                        });


                        user.channels= filtered;


                    }

                }


                return {...user};

        default:
            return userState;
    }
}
