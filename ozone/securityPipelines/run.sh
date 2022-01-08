#!/bin/bash
echo "************************"
echo "Security Pipeline(Sonarqube, Snyk) Testing API REST..."
echo "************************"
./node_modules/mocha/bin/mocha ozone/securityPipelines/runThis.js --timeout 100000 --reporter mochawesome
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
