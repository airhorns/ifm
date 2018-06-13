#!/usr/bin/env bash
# This script is run by the CD platform to deploy the app.
set -ex
export REVISION=${CIRCLE_SHA1}
export KUBECONFIG=${HOME}/.kube/config
export ENVIRONMENT=production

# kubernetes-deploy comes from the gem installed in the docker container this runs in in circle.
kubernetes-deploy --template-dir=config/deploy/$ENVIRONMENT ifm-production gke_integrated-farm-manager_us-central1-a_development-tiny
