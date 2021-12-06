#!/bin/bash
# setup.sh
echo [Desktop Entry] | sudo tee /etc/xdg/autostart/mosquitto.desktop
echo Name=Mosquitto | sudo tee -a /etc/xdg/autostart/mosquitto.desktop
echo Exec=mosquitto | sudo tee -a /etc/xdg/autostart/mosquitto.desktop

echo [Desktop Entry] | sudo tee /etc/xdg/autostart/clock.desktop
echo Type=Application | sudo tee -a /etc/xdg/autostart/clock.desktop
echo Name=Clock | sudo tee -a /etc/xdg/autostart/clock.desktop
echo Exec=/usr/bin/python3 /home/pi/IoT/src/raspberry/hour.py | sudo tee -a /etc/xdg/autostart/clock.desktop

echo [Desktop Entry] | sudo tee /etc/xdg/autostart/python-api.desktop
echo Type=Application | sudo tee -a /etc/xdg/autostart/python-api.desktop
echo Name=PythonApi | sudo tee -a /etc/xdg/autostart/python-api.desktop
echo Exec=/usr/bin/python3 /home/pi/IoT/src/raspberry/api.py | sudo tee -a /etc/xdg/autostart/python-api.desktop

echo [Desktop Entry] | sudo tee /etc/xdg/autostart/scala.desktop
echo Type=Application | sudo tee -a /etc/xdg/autostart/scala.desktop
echo Name=Backend | sudo tee -a /etc/xdg/autostart/scala.desktop
echo Exec=cd /home/pi/IoT/src/reveil-scala/start.sh | sudo tee -a /etc/xdg/autostart/scala.desktop