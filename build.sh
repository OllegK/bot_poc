#!/bin/bash
rm ./output/*.png

docker build -t olegk/bot_poc_wind2 .

docker run --cap-add=NET_ADMIN -it -e ID='bot1' -v ~/bot_poc/output:/usr/src/app/output olegk/bot_poc_wind2
