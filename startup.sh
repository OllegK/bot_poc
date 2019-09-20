#!/bin/bash
/etc/init.d/windscribe-cli start
mkdir -p /dev/net
mknod /dev/net/tun c 10 200