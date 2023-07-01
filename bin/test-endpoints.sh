#!/bin/bash

source ./bin/scripts.sh

cd tests_se_project_express/
npm install -g newman
timeout 60 bash ./bin/newman.sh
check $?