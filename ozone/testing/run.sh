#!/bin/bash
echo "************************"
echo "Testing API REST..."
echo "************************"
./node_modules/mocha/bin/mocha ozone/testing/runThis.js --timeout 100000 --reporter mochawesome
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
