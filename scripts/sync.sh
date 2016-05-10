#!/bin/bash
rsync -prtvz /media/pen/ probe@94.46.160.55:/home/probe/logs
rsync -prtvz /home/pi/logs/ probe@94.46.160.55:/home/probe/logs
