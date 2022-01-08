#!/bin/bash
echo "************************"
echo "All Type Webhook Testing API REST..."
echo "************************"
./node_modules/mocha/bin/mocha ozone/webhook/runThis.js --timeout 100000 --bail --reporter mochawesome
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
