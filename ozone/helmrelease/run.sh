#!/bin/bash
echo "************************"
echo "Helm App and Helm Release Creation Testing API REST..."
echo "************************"
./node_modules/mocha/bin/mocha ozone/helmrelease/runThis.js --timeout 100000 --bail --reporter mochawesome
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
