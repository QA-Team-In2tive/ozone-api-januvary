#!/bin/bash
echo "************************"
echo "Pipeline And Task CURD Operation Testing API REST..."
echo "************************"
./node_modules/mocha/bin/mocha test/pipelineAndTasks/runThis.js --timeout 100000 --reporter mochawesome
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
