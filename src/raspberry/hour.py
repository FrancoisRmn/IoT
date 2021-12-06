import time
import datetime

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

def displayHour():
    hour = ""
    while True:
        hour = datetime.datetime.now().strftime("%H:%M")
        with canvas(virtual) as draw:
            text(draw, (0, 0), hour, fill="white", font=proportional(CP437_FONT))
        time.sleep(1)

if __name__ == "__main__":
    t1 = Thread(target = displayHour)
    t1.setDaemon(True)
    t1.start()