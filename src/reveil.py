import RPi.GPIO as GPIO
import math
import time
import datetime

from threading import Thread
from luma.led_matrix.device import max7219
from luma.core.interface.serial import spi, noop
from luma.core.render import canvas
from luma.core.legacy import text
from luma.core.legacy.font import proportional, CP437_FONT, LCD_FONT
from luma.core.virtual import viewport

serial = spi(port=0, device=0, gpio=noop())
device = max7219(serial,cascaded=4,block_orientation=-90, rotate = 2)
virtual = viewport(device, width=142, height=8)

def displayHour():
    hour = ""
    while True:
        hour = datetime.datetime.now().strftime("%H:%M")
        with canvas(virtual) as draw:
            text(draw, (0, 0), hour, fill="white", font=proportional(CP437_FONT))
        time.sleep(1)
      
stopped = False

def turnOffAlarm(null):
    global stopped
    stopped = True
    GPIO.output(21, GPIO.LOW)

def turnOnAlarm():
    global stopped
    while not stopped:
        GPIO.output(21, GPIO.HIGH)
        time.sleep(0.5)
        GPIO.output(21, GPIO.LOW)
        time.sleep(0.3)

if __name__ == "__main__":
    
    activated = False
    
    GPIO.setmode(GPIO.BCM) #on note le numero du GPIO et non de la pin
    GPIO.setup(21, GPIO.OUT)
    GPIO.setup(16, GPIO.IN, pull_up_down = GPIO.PUD_UP)

    GPIO.add_event_detect(16, GPIO.FALLING, callback=turnOffAlarm, bouncetime=100)
    
    
    t1 = Thread(target = displayHour)
    t1.setDaemon(True)
    t1.start()
    
    while True:
        if datetime.datetime.now().strftime("%H:%M") == "17:19" and not activated:
            activated = True
            turnOnAlarm()