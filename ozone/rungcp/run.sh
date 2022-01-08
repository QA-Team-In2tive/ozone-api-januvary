#!/bin/bash
echo "************************"
echo "GCP Flow(GCR Registry, GCP Cluster, Custom App, Pipeline Run And Generic Webhook) Testing API REST..."
echo "************************"
./node_modules/mocha/bin/mocha ozone/rungcp/runThis.js --timeout 100000 --bail --reporter mochawesome
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
