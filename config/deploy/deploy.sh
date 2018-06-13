#!/usr/bin/env bash
# This script is run by the CD platform to deploy the app.
set -ex
export KUBECONFIG=${HOME}/.kube/config
export ENVIRONMENT=production

if [[ -z "${CIRCLECI}" ]]; then
  # kubernetes-deploy is in the bundle
  export REVISION=${REVISION:$(git rev-parse HEAD)}
  DEPLOY_COMMAND="bundle exec kubernetes-deploy"
else
  # kubernetes-deploy comes from the gem installed in the docker container this runs in in circle.
  DEPLOY_COMMAND="kubernetes-deploy"
  export REVISION=${CIRCLE_SHA1}
fi

eval "$DEPLOY_COMMAND --template-dir=config/deploy/$ENVIRONMENT ifm-production gke_integrated-farm-manager_us-central1-a_development-tiny"
