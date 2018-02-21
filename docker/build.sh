#!/bin/bash

YARN_CACHE_DIR=$(which yarn > /dev/null && yarn cache dir || (mkdir /tmp/yarn-cache && echo /tmp/yarn-cache))

mkdir -p .local/api/dist
mkdir -p .local/api/node_modules
mkdir -p .local/static

docker container run --rm --interactive --tty \
	--workdir /home/node/app \
	--volume $(realpath ..):/home/node/app \
	--volume ${YARN_CACHE_DIR}:/usr/local/share/.cache/yarn/v1 \
	--volume $(realpath .local/api/node_modules):/tmp/api_node_modules \
	--volume $(realpath .local/api/dist):/home/node/app/dist \
	--volume $(realpath .local/static):/home/node/app/dist/client \
	node:8.9.4 \
	ln -s /tmp/api_node_modules /home/node/app/node_modules \
	&& yarn
