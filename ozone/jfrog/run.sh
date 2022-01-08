#!/bin/bash
echo "************************"
echo "Jfrog Flow(Provider, Registy, Custom App and Pipeline Run) Testing API REST..."
echo "************************"
./node_modules/mocha/bin/mocha ozone/jfrog/runThis.js --timeout 100000 --bail --reporter mochawesome
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
