#!/bin/bash
cd /home/pi/logs
/usr/local/sbin/airmon-ng start wlan0 >/dev/null 2>&1
/usr/local/sbin/airodump-ng wlan0mon -o csv -w output --beacons --gpsd >/dev/null 2>&1
