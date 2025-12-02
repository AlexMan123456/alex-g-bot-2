#!/bin/bash

version=$(jq -r '.version' < package.json)

git pull origin main
npx alex-c-line edit-env LAST_UPDATED $(date -Iseconds)
DOCKER_BUILDKIT=0 docker build --network postgres_database -t alex-g-bot-2:$version .

docker stop alex-g-bot-2
docker rm alex-g-bot-2

docker run -d --network postgres_database --name alex-g-bot-2 alex-g-bot-2:$version
