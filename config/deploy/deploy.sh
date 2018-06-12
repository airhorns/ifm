#!/usr/bin/env bash
# This script is run by the CD platform to deploy the app.
set -ex
export REVISION='aaaa'
export KUBECONFIG=${HOME}/.kube/config
export ENVIRONMENT=production

bundle exec kubernetes-deploy --template-dir=config/deploy/$ENVIRONMENT ifm-production gke_integrated-farm-manager_us-central1-a_development-tiny
