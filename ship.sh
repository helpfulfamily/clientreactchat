app_name=$1
app_version=$2
namespace=webclient

build_local_project () {
                echo ">>>>>>>>>>>>>>>>>>> BUILDING LOCAL PROJECT"

                if [[ $app_name  =~ "clientreactchat" ]]; then
                                 yarn build .
 
                    else
                                 echo "App name contains neither 'clientreactchat' nor 'service'. Therefore exiting."
                                 exit 0
                     fi

                    }

docker_process(){
        echo ">>>>>>>>>>>>>>>>>>> DOCKER IMAGE BUILD"

        docker build . -t $app_name:$app_version

        echo ">>>>>>>>>>>>>>>>>>> DOCKER IMAGE TAG"
        docker tag $app_name:$app_version hunaltay/$app_name:$app_version

        echo ">>>>>>>>>>>>>>>>>>> DOCKER IMAGE PUSH"
        docker push hunaltay/$app_name:$app_version


}
openshift_process_route(){
 echo ">>>>>>>>>>>>>>>>>>> OPENSHIFT: CREATE ROUTE"
if [[ $app_name  =~ "clientreactchat" ]]; then


            oc create -f clientreactchat.yaml

oc patch route $app_name \
    -p '{"metadata":{"annotations":{  "kubernetes.io/tls-acme" : "true"   }}}'

fi
}


openshift_process(){
              echo ">>>>>>>>>>>>>>>>>>> OPENSHIFT: CREATE APP"

              oc delete all --selector app=$app_name

              oc new-app hunaltay/$app_name:$app_version

              openshift_process_route



}


if [[ -n "$app_name" ]]; then
        if [[ -n "$app_version" ]]; then

            oc project $namespace

            build_local_project


            docker_process

           openshift_process



        else
            echo "Put the app version"
        fi
else
    echo "Put the app name"
fi

