# How to setup the raspberry ?

## Install libraries

First of all, you need to have the latest versions of the libraries for your system. To do them, use the command below : 

```sudo apt update && sudo apt upgrade -y```


After that, you need to install `npm` and `node` for the api. Use the command below : 

```
sudo apt install npm -y
wget "https://nodejs.org/dist/v16.13.0/node-v16.13.0-linux-armv7l.tar.xz"
tar -xzf node-v16.13.0-linux-armv7l.tar/gz
cd node-v16.13.0-linux-armv7l
sudo cp -R * /usr/local/
```

You also need to install `Scala`. Scala requires `java` and `sbt`. You can use the command below : 

```
sudo apt install default-jdk -y
wget www.scala-lang.org/files/archive/scala-2.13.7.deb
sudo dpkg -i scala*.deb
wget https://github.com/sbt/sbt/releases/download/v1.5.5/sbt-1.5.5.tgz
tar -xzf sbt-1.5.5.tgz
cd sbt
sudo cp -R * /usr/local/
sudo echo #!/bin/sh >> /bin/sbt
sudo echo java -server -Xmx512M -jar /usr/local/bin/sbt-launch.jar "$@" >> /bin/sbt
```

You also need to setup the mqtt broker. It use `mosquitto` and you can use command below : 

```sudo apt install mosquitto -y```

## Configure your raspberry

Your raspberry must have a single fixed IP address. You can set by using this command : 

```
echo interface wlan0 >> /etc/dhcpcd.conf
echo static ip_address=192.168.0.125/24 >> /etc/dhcpcd.conf
echo static routers=192.168.0.1 >> /etc/dhcpcd.conf
echo static domain_name_servers=192.168.0.1 >> /etc/dhcpcd.conf
```

## Configure the app

First of all you need to clone the repo :

```git clone https://github.com/FrancoisRmn/IoT.git```

You need to setup the raspberry for launching all services on start. You can use the command below : 

```./setup.sh```

The script will launch automatically all services

## Restart your raspberry

Now, you have to restart your raspberry and normally, all services are up.

```sudo reboot```