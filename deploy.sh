#!/bin/bash
git fetch origin
git checkout origin/master -- .
pm2 reload ecosystem.config.js --env production
