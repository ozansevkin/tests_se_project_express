#!/bin/bash

source ./bin/scripts.sh

npm ci
node ./src/index.js ../
check $?
