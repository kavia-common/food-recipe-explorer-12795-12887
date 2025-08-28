#!/bin/bash
cd /home/kavia/workspace/code-generation/food-recipe-explorer-12795-12887/FrontendWebApplication
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

