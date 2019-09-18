#!/bin/sh
rm ./output/*.png

docker build -t olegk/bot_poc_wind .

docker run -it -e ID='bot1' -v ~/bot_poc/output:/usr/src/app/output bot_poc_wind 
# --network "container:047cb1f23aad" 