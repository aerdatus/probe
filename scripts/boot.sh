#!/bin/bash
sleep 15
/bin/bash /home/pi/start_wlan &
sleep 15
/bin/bash /home/pi/start_probe
sleep 15
/bin/bash /home/pi/start_bluelog > /tmp/start_bluelog.log 2>&1
