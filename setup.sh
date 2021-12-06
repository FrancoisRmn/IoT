#!/bin/bash
# setup.sh
echo [Desktop Entry] | sudo tee /etc/xdg/autostart/mosquitto.desktop
echo Name=Mosquitto | sudo tee -a /etc/xdg/autostart/mosquitto.desktop
echo Exec=mosquitto | sudo tee -a /etc/xdg/autostart/mosquitto.desktop

echo [Desktop Entry] | sudo tee /etc/xdg/autostart/clock.desktop
echo Type=Application | sudo tee -a /etc/xdg/autostart/clock.desktop
echo Name=Clock | sudo tee -a /etc/xdg/autostart/clock.desktop
echo Exec=/usr/bin/python3 /home/pi/IoT/src/raspberry/hour.py | sudo tee -a /etc/xdg/autostart/clock.desktop