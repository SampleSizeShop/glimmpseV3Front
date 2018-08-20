#!/usr/bin/env bash
# ##############################################################################################################
# set up env
# ##############################################################################################################
echo REPO > sshenv
echo IMAGE >> sshenv
scp -oUserKnownHostsFile=/dev/null -oStrictHostKeyChecking=no -i ${EC2_SSH_KEY} sshenv ${EC2_URL}:~/
ssh -oUserKnownHostsFile=/dev/null -oStrictHostKeyChecking=no -i ${EC2_SSH_KEY} ${EC2_URL} /bin/bash << 'EOT'
echo start marking variables for export
set -a
. ./sshenv
set +a
echo stop old container
sudo docker stop $(docker ps -q --filter ancestor=$REPO/$IMAGE:latest)
echo log into EC2 instance. Pull and deploy new container.
$(aws ecr get-login --no-include-email --region us-east-1)
sudo docker pull $REPO/$IMAGE
sudo docker run -d -p 80:80 $REPO/$IMAGE
echo clean up
rm -f sshenv
EOT
