#!/bin/bash
echo "************************"
echo "Rerun Pipeline Testing API REST..."
echo "************************"
./node_modules/mocha/bin/mocha test/pipelines/rerunPipeline/runThis.js --timeout 100000 --reporter mochawesome
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
