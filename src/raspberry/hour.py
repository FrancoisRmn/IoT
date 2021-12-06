import time
import datetime

import RPi.GPIO as GPIO

from threading import Thread
from luma.led_matrix.device import max7219
from luma.core.interface.serial import spi, noop
from luma.core.render import canvas
from luma.core.legacy import text
from luma.core.legacy.font import proportional, CP437_FONT
from luma.core.virtual import viewport

serial = spi(port=0, device=0, gpio=noop())
device = max7219(serial,cascaded=4,block_orientation=-90, rotate = 2)
virtual = viewport(device, width=142, height=8)

isScreenOn = True

def displayHour():
    global isScreenOn
    hour = ""
    while True:
        if (isScreenOn):
            hour = datetime.datetime.now().strftime("%H:%M")
        else:
            hour = ""
        with canvas(virtual) as draw:
            text(draw, (0, 0), hour, fill="white", font=proportional(CP437_FONT))
        time.sleep(1)

def toggleScreen(null):
    global isScreenOn
    start_time = time.time()
    GPIO.wait_for_edge(16, GPIO.RISING)
    time_elapsed = time.time() - start_time
    if (time_elapsed >= 3):
        isScreenOn = not isScreenOn

if __name__ == "__main__":
    t1 = Thread(target = displayHour)
    t1.setDaemon(True)
    t1.start()

    GPIO.add_event_detect(16, GPIO.FALLING, callback=toggleScreen, bouncetime=3000)

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        exit(1)