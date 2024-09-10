#ifndef STATUSLED_H
#define STATUSLED_H

#include <Arduino.h>
#include <constants.h>

/**
 * manages the state of the connected RGB led
 */
class StatusLED{
    private:

    public:
        /**
         * initialized the pins / sets them all as an output
         */
        static void initializePins(){
            pinMode(LED_RED, OUTPUT);
            pinMode(LED_GREEN, OUTPUT);
            pinMode(LED_BLUE, OUTPUT);
        }

        /**
         * sets the color of the led to red
         */
        static void setRed(){
            digitalWrite(LED_RED, HIGH);
            digitalWrite(LED_GREEN, LOW);
            digitalWrite(LED_BLUE, LOW);
        }

        /**
         * sets the color of the led to green
         */
        static void setGreen(){
            digitalWrite(LED_RED, LOW);
            digitalWrite(LED_GREEN, HIGH);
            digitalWrite(LED_BLUE, LOW);
        }

        /**
         * sets the color of the led to blue
         */
        static void setBlue(){
            digitalWrite(LED_RED, LOW);
            digitalWrite(LED_GREEN, LOW);
            digitalWrite(LED_BLUE, HIGH);
        }
};

#endif