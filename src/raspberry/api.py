import requests
import time
import datetime
import os

def connectionApi():
    # api-endpoint
    URL = "http://localhost:8088/wakeup"
    r = requests.get(url = URL)
    data = r.json()
    return data[0]

if __name__ == "__main__":
    count = 0
    hour = 0
    minutes = 0
    while True:
        while count < 10:
            count += 1
            time.sleep(1)
            local = datetime.datetime.now().strftime("%H:%M")
            if local == (hour + ":" + minutes):
                os.system("python3 /home/pi/IoT/src/raspberry/alarm " + hour + " " + minutes)
            if count == 10:
                seconds = connectionApi()
                count = 0
                hour = seconds // 3600
                minutes = seconds - (hour * 3600)
            
