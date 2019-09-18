#!/bin/sh
rm ./output/*.png

docker build -t olegk/bot_poc .

docker images

docker run -it -e ID='bot1' -v ~/bot_poc/output:/usr/src/app/output olegk/bot_poc 
# --network "container:047cb1f23aad" 