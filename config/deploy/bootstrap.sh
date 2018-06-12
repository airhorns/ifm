#!/usr/bin/env bash
# This script provisions a new k8s cluster for deploying ifm from scratch. Horray!
# Note: the user running this has to have cluster admin priviledges!
# Run kubectl create clusterrolebinding harry-cluster-admin-binding --clusterrole=cluster-admin --user=harry.brundage@gmail.com for example to give yourself priviledges on a new cluster
set -ex
helm repo update
kubectl create namespace ifm-production
