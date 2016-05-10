#!/bin/bash
sleep 15
/bin/bash /home/pi/probe/scripts/start_wlan &
sleep 15
/bin/bash /home/pi/probe/scripts/start_probe
sleep 15
/bin/bash /home/pi/probe/scripts/start_bluelog > /tmp/start_bluelog.log 2>&1
