#!/bin/bash
git fetch origin
git checkout origin/master -- .
pm2 reload ecosystem.config.js --env production
echo "Waiting for app to restart..."
sleep 8
bash "$(dirname "$0")/warmup.sh"
