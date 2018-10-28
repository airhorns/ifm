#!/usr/bin/env bash
# This script is run by the CD platform to deploy the app.
set -ex
export KUBECONFIG=${HOME}/.kube/config
export ENVIRONMENT=production
export CLUSTER="gke_harrys-berries_us-central1-a_production"

if [[ -z "${CIRCLECI}" ]]; then
  # kubernetes-deploy is in the bundle
  GIT_SHA=$(git rev-parse HEAD)
  export REVISION=${REVISION:-$GIT_SHA}
  DEPLOY_COMMAND="bundle exec kubernetes-deploy"
else
  # kubernetes-deploy comes from the gem installed in the docker container this runs in in circle.
  DEPLOY_COMMAND="kubernetes-deploy"
  export REVISION=${CIRCLE_SHA1}
fi

# deploy cluster wide resources like certificates and whatnot
eval "$DEPLOY_COMMAND --template-dir=config/deploy/cluster --allow-protected-ns --no-prune default $CLUSTER"

# deploy application to it's namespace
eval "$DEPLOY_COMMAND --template-dir=config/deploy/$ENVIRONMENT ifm-production $CLUSTER"
