#!/bin/sh

BASE_DIR=/home/vagrant/workspace/github/saitoxu.github.io
LAYOUTS=${BASE_DIR}/_layouts
POSTS=${BASE_DIR}/_posts
CSS=${BASE_DIR}/css
IMAGES=${BASE_DIR}/images

echo "Watching..."
while :
do
  touch ${BASE_DIR} ${LAYOUTS} ${POSTS} ${CSS} ${IMAGES}
  usleep 200000
done
