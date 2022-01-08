#!/bin/bash
echo "************************"
echo "Governance Module(Member, Role, Project And LadpGroup) CURD Operation Testing API REST..."
echo "************************"
./node_modules/mocha/bin/mocha test/governance/runThis.js --timeout 100000 --reporter mochawesome
echo "************************"
echo "Killing background processes..."
echo "************************"
jobs -p | xargs -I {} kill {}
