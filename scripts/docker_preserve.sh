#!/usr/bin/env bash
# ##############################################################################################################
# docker repo username, image name, version
# ##############################################################################################################
REPO=${ECR_REPO}
IMAGE=${ECR_IMG}
VERSION=$(node -e "console.log(require('./package.json').version)")
# #############################################################################################################
# build image & push to aws repo
# #############################################################################################################
echo BUILDING IMAGE IN SCRIPT
echo $REPO
docker build -t $REPO/$IMAGE:latest -t $REPO/$IMAGE:$VERSION .
echo PUSH IMAGE IN SCRIPT
docker push $REPO/$IMAGE:latest
docker push $REPO/$IMAGE:$VERSION
