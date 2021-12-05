import RPi.GPIO as gpio
import math
import time
import datetime
from demo_opts import get_device
from luma.core.render import canvas

# Set the gpio mode
gpio.setmode(gpio.BCM)

ALARM = 21  # Output of the alarm
ALARM_BUTTON = 10  # Button for the alarm



def setup_utils():
    """
    A function to setup inputs and outputs
    :return:
    """
    # Set output and inputs
    gpio.setup(ALARM_BUTTON, gpio.IN)
    gpio.setup(ALARM, gpio.OUT)

def off_alarm_with_button():
    """
    A function to off the alarm
    :return:
    """

    while True:
        if gpio.input(ALARM_BUTTON) == gpio.HIGH:
            gpio.output(ALARM, gpio.LOW)
            break

def alarm():
    """
    A function to switch on the alarm
    :return:
    """
    while True:
        gpio.output(ALARM, gpio.HIGH)
        time.sleep(0.5)
        gpio.output(ALARM, gpio.LOW)
        time.sleep(0.5)


def posn(angle, arm_length):
    dx = int(math.cos(math.radians(angle)) * arm_length)
    dy = int(math.sin(math.radians(angle)) * arm_length)
    return (dx, dy)



def main():
    today_last_time = "Unknown"
    while True:
        now = datetime.datetime.now()
        today_date = now.strftime("%d %b %y")
        today_time = now.strftime("%H:%M:%S")
        if today_time != today_last_time:
            today_last_time = today_time
            with canvas(device) as draw:
                now = datetime.datetime.now()
                today_date = now.strftime("%d %b %y")

                margin = 4

                cx = 30
                cy = min(device.height, 64) / 2

                left = cx - cy
                right = cx + cy

                hrs_angle = 270 + (30 * (now.hour + (now.minute / 60.0)))
                hrs = posn(hrs_angle, cy - margin - 7)

                min_angle = 270 + (6 * now.minute)
                mins = posn(min_angle, cy - margin - 2)

                sec_angle = 270 + (6 * now.second)
                secs = posn(sec_angle, cy - margin - 2)

                draw.ellipse((left + margin, margin, right - margin, min(device.height, 64) - margin), outline="white")
                draw.line((cx, cy, cx + hrs[0], cy + hrs[1]), fill="white")
                draw.line((cx, cy, cx + mins[0], cy + mins[1]), fill="white")
                draw.line((cx, cy, cx + secs[0], cy + secs[1]), fill="red")
                draw.ellipse((cx - 2, cy - 2, cx + 2, cy + 2), fill="white", outline="white")
                draw.text((2 * (cx + margin), cy - 8), today_date, fill="yellow")
                draw.text((2 * (cx + margin), cy), today_time, fill="yellow")

        time.sleep(0.1)

if __name__ == "__main__":
    try:
        setup_utils()
        device = get_device()
        main()
    except KeyboardInterrupt:
        pass