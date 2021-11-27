#!/bin/bash
# setup.sh
echo [Desktop Entry] | sudo tee /etc/xdg/autostart/alarmclock.desktop
echo Exec=mosquitto | sudo tee -a /etc/xdg/autostart/alarmclock.desktop