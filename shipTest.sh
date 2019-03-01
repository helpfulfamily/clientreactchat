  oc create route edge --service='serviceha' \
                       --insecure-policy='Redirect' \
                       --port=8080-tcp


