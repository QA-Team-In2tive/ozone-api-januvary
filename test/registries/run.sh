#!/bin/bash
echo "************************"
echo "All Type Registry Creation Testing API REST..."
echo "************************"
./node_modules/mocha/bin/mocha test/registries/runThis.js --timeout 100000 --reporter mochawesome
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
