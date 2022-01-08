#!/bin/bash
echo "Deleting ozone....."
kubectl delete --filename https://storage.googleapis.com/tekton-releases/pipeline/latest/release.yaml

kubectl delete ns ozone 

kubectl get crds | grep fluxcd | awk '{print $1}' | xargs kubectl delete crds 
kubectl delete ns flux-system --force --grace-period=0 --wait=false

kubectl delete -f https://raw.githubusercontent.com/projectcontour/contour/release-1.16/examples/render/contour.yaml -n istio-system

kubectl delete ns istio-system

# echo "Do you want to delete istio-system ? [Yes/No]"
# read response 
# if [ "$response" == "Yes" ]; then
#     echo "Deleting istio-system"
#     kubectl delete ns istio-system --force --grace-period=0 --wait=false
# fi

kubectl delete -f https://raw.githubusercontent.com/operator-framework/operator-lifecycle-manager/master/deploy/chart/crds/0000_50_olm_00-catalogsources.crd.yaml
kubectl delete -f https://raw.githubusercontent.com/operator-framework/operator-lifecycle-manager/master/deploy/chart/crds/0000_50_olm_00-clusterserviceversions.crd.yaml
kubectl delete -f https://raw.githubusercontent.com/operator-framework/operator-lifecycle-manager/master/deploy/chart/crds/0000_50_olm_00-installplans.crd.yaml
kubectl delete -f https://raw.githubusercontent.com/operator-framework/operator-lifecycle-manager/master/deploy/chart/crds/0000_50_olm_00-operatorconditions.crd.yaml
kubectl delete -f https://raw.githubusercontent.com/operator-framework/operator-lifecycle-manager/master/deploy/chart/crds/0000_50_olm_00-operatorgroups.crd.yaml
kubectl delete -f https://raw.githubusercontent.com/operator-framework/operator-lifecycle-manager/master/deploy/chart/crds/0000_50_olm_00-operators.crd.yaml
kubectl delete -f https://raw.githubusercontent.com/operator-framework/operator-lifecycle-manager/master/deploy/chart/crds/0000_50_olm_00-subscriptions.crd.yaml
kubectl delete ns olm --force --grace-period=0 --wait=false


kubectl delete deployments.apps --all
