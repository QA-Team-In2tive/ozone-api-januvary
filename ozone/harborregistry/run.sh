#!/bin/bash
echo "************************"
echo "Harbor Flow(Provider, Registy, Custom App and Pipeline Run) Testing API REST..."
echo "************************"
./node_modules/mocha/bin/mocha ozone/harborregistry/runThis.js --timeout 100000 --bail --reporter mochawesome 
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
