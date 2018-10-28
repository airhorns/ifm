#!/usr/bin/env bash
# This script sets up a newly provisioned a new k8s cluster for deploying ifm from scratch. Horray!
# Note: the user running this has to have cluster admin priviledges!
# Run kubectl create clusterrolebinding harry-cluster-admin-binding --clusterrole=cluster-admin --user=harry.brundage@gmail.com for example to give yourself priviledges on a new cluster
set -ex
kubectl create -f config/deploy/tiller-service-account.yaml
helm init --service-account tiller
helm repo update
kubectl create namespace ifm-production

sleep 30
helm install --name cert-manager --namespace kube-system stable/cert-manager
helm install --name nginx-ingress stable/nginx-ingress -f config/deploy/nginx-ingress-controller.yml

helm repo add influx http://influx-charts.storage.googleapis.com
helm install --name telegraf influx/telegraf-ds -f config/deploy/telegraf.yaml
