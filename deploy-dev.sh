#!/bin/bash

_remote="3.228.101.116"
_user="ec_root"
_remote_directory_name="drsajjadnaseer"

echo "❗❗❗ Dr sajjad naseer Frontend Deployment ❗❗❗"
echo "Local system name: $HOSTNAME"
echo "Local date and time: $(date)"

echo "❗❗❗ Sync started ❗❗❗"
# Rsync the build directory to the remote server
rsync -rtu --delete --progress --exclude '.git' "." $_user@$_remote:/var/www/html/$_remote_directory_name
