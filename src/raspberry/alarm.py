import RPi.GPIO as GPIO
import datetime
import time
import sys

stopped = False

def turnOffAlarm(null):
    global stopped
    stopped = True
    GPIO.output(21, GPIO.LOW)
    exit(0)

def turnOnAlarm():
    global stopped
    while not stopped:
        GPIO.output(21, GPIO.HIGH)
        time.sleep(0.5)
        GPIO.output(21, GPIO.LOW)
        time.sleep(0.3)

if __name__ == "__main__":
    GPIO.setmode(GPIO.BCM) #on note le numero du GPIO et non de la pin
    GPIO.setup(21, GPIO.OUT)
    GPIO.setup(16, GPIO.IN, pull_up_down = GPIO.PUD_UP)

    GPIO.add_event_detect(16, GPIO.FALLING, callback=turnOffAlarm, bouncetime=100)
    
    activated = False

    args = sys.argv[1:]
    
    while True:
        if datetime.datetime.now().strftime("%H:%M") == (args[0] + ":" + args[1]) and not activated:
            activated = True
            turnOnAlarm()