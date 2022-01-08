#!/bin/bash
echo "************************"
echo "All Type Repository Creation Testing API REST..."
echo "************************"
./node_modules/mocha/bin/mocha test/repositories/runThis.js --timeout 100000 --reporter mochawesome
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
