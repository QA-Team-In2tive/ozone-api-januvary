#!/bin/bash
echo "************************"
echo "Azure Flow(ACR Registry, Azure Cluster, Custom App, Pipeline Run And Generic Webhook) Testing API REST..."
echo "************************"
./node_modules/mocha/bin/mocha ozone/runazure/runThis.js --timeout 100000 --bail --reporter mochawesome
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
