#!/bin/bash
bluelog -k
forever stopall
killall airodump-ng
killall node
