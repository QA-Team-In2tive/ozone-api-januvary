#!/bin/bash
echo "************************"
echo "Custom App Deploy Testing API REST..."
echo "************************"
./node_modules/mocha/bin/mocha ozone/deployapp/runThis.js --timeout 100000 --bail --reporter mochawesome
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
