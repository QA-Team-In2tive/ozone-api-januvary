#!/bin/bash
cd /tmp
git clone https://"In2Govind":"In2Govind%401234"@github.com/QaIn2tive/github-hello-world.git
cd github-hello-world
cat index.html > test.txt
git add test.txt
git commit -m "testing push"
git push origin master

