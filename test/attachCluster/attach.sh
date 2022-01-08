# !/bin/bash
echo "Do you have the cluster name. Example: attach1, attach2..... etc"
read response
pks get-kubeconfig $response -a pksapi.in2tive.xyz -u pramod -p MFVu2K6$ -k
kubectl config use-context $response
kubectl config get-contexts
cd test/attachCluster
sh uninstall.sh
kubectl get namespaces
kubectl create -f attach.yaml
    