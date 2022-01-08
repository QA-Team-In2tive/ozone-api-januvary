#!/bin/bash
echo "************************"
echo "Application Delpoy Testing API REST..."
echo "************************"
./node_modules/mocha/bin/mocha test/app/runThis.js --timeout 100000 --reporter mochawesome
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
