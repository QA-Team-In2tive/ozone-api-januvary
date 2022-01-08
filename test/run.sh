#!/bin/bash
echo "************************"
echo "Providers, Registry, Repository, Deployconfig, PipelineAndTask, Governance Testing API REST..."
echo "************************"
./node_modules/mocha/bin/mocha test/runThis.js --timeout 99999999 --reporter mochawesome
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
