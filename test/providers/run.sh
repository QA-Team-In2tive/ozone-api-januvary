#!/bin/bash
echo "************************"
echo "All Type Provider Creation Testing API REST..."
echo "************************"
./node_modules/mocha/bin/mocha test/providers/runThis.js --timeout 100000 --reporter mochawesome 
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
