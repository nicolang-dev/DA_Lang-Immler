#ifndef STATUSLED_H
#define STATUSLED_H

#include <Arduino.h>
#include <constants.h>

class StatusLED{
    private:

    public:
        static void initializePins(){
            pinMode(LED_RED, OUTPUT);
            pinMode(LED_GREEN, OUTPUT);
            pinMode(LED_BLUE, OUTPUT);
        }

        static void setRed(){
            digitalWrite(LED_RED, HIGH);
            digitalWrite(LED_GREEN, LOW);
            digitalWrite(LED_BLUE, LOW);
        }

        static void setGreen(){
            digitalWrite(LED_RED, LOW);
            digitalWrite(LED_GREEN, HIGH);
            digitalWrite(LED_BLUE, LOW);
        }

        static void setBlue(){
            digitalWrite(LED_RED, LOW);
            digitalWrite(LED_GREEN, LOW);
            digitalWrite(LED_BLUE, HIGH);
        }
};

#endif