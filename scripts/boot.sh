#!/bin/bash
sleep 15
/bin/bash /home/pi/probe/scripts/start_wlan.sh &
sleep 15
/bin/bash /home/pi/probe/scripts/start_probe.sh
sleep 15
/bin/bash /home/pi/probe/scripts/start_bluelog.sh > /tmp/start_bluelog.log 2>&1
