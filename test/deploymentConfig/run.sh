#!/bin/bash
echo "************************"
echo "Deployment Config Environmant, Variables, HelmChannl and Webhood CURD Operation Testing API REST..."
echo "************************" 
./node_modules/mocha/bin/mocha test/deploymentConfig/runThis.js --timeout 100000 --reporter mochawesome
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
