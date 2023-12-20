#!/usr/bin/env bash

day=$1

mkdir ${day}
touch ${day}/1.js
touch ${day}/2.js
node ./getInput.js ${day} > ${day}/input.txt