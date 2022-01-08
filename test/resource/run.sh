#!/bin/bash
echo "************************"
echo "Resource Moduel(Cluster, Repository, Registry) CURD Operation Testing API REST..."
echo "************************"
./node_modules/mocha/bin/mocha test/resource/runThis.js --timeout 100000 --reporter mochawesome
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
