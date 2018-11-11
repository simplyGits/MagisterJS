#!/usr/bin/env bash

curl 'https://doc.esdoc.org/api/create' \
	-X POST \
	--data-urlencode "gitUrl=git@github.com:simplyGits/MagisterJS.git"
