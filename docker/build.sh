#!/bin/bash -xe

# use yarn cache directory on build machine or fallback to a temporary yarn cache location
YARN_CACHE_DIR=$(which yarn > /dev/null && yarn cache dir || (mkdir /tmp/yarn-cache && echo /tmp/yarn-cache))

# create build destination directories
mkdir -p .local/api/dist
mkdir -p .local/api/node_modules
mkdir -p .local/static

# run docker container to install dependencies and build the project
docker container run --rm --interactive --tty \
	--workdir /home/node/app \
	--volume $(realpath ..):/home/node/app \
	--volume ${YARN_CACHE_DIR}:/usr/local/share/.cache/yarn/v1 \
	--volume $(realpath .local/api/node_modules):/tmp/dist_node_modules \
	--volume $(realpath .local/api/dist):/home/node/app/dist \
	--volume $(realpath .local/static):/home/node/app/dist/client \
	node:8.9.4 \
	bash -xec "\
	NODE_ENV=development yarn install \
	&& NODE_ENV=production yarn run build-server \
	&& NODE_ENV=production yarn run build-client \
	&& NODE_ENV=production yarn install --offline --modules-folder /tmp/dist_node_modules \
	"

# remove automatically created client build directory
rmdir .local/api/dist/client/

# copy package.json to the build directory
cp -f ../package.json .local/api/
