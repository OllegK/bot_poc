#!/bin/sh
docker build -t olegk/bot_poc .

docker images

docker run -e ID='bot1' -v ~/bot_poc/output:/usr/src/app/output olegk/bot_poc
