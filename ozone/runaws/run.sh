#!/bin/bash
echo "************************"
echo "AWS Flow(ECR Registry, AWS Cluster, Custom App, Pipeline Run And Generic Webhook)Testing API REST..."
echo "************************"
./node_modules/mocha/bin/mocha ozone/runaws/runThis.js --timeout 100000 --bail --reporter mochawesome
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
