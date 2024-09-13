#ifndef STATUSLED_H
#define STATUSLED_H

#include <Arduino.h>
#include <constants.h>

/**
 * manages the state of the connected RGB led
 */
class StatusLED{
    private:
        StatusLED(){}
        static StatusLED *instance;

    public:
        static StatusLED* getInstance(){
            if(instance == nullptr){
                instance = new StatusLED();
            }
            return instance;
        }

        StatusLED(const StatusLED*) = delete;
        StatusLED& operator = (const StatusLED&) = delete;

        /**
         * initializes the pins / sets them all as an output
         */
        void initializePins(){
            pinMode(LED_RED, OUTPUT);
            pinMode(LED_GREEN, OUTPUT);
            pinMode(LED_BLUE, OUTPUT);
        }

        /**
         * sets the color of the led to red
         */
        void setRed(){
            digitalWrite(LED_RED, HIGH);
            digitalWrite(LED_GREEN, LOW);
            digitalWrite(LED_BLUE, LOW);
        }

        /**
         * sets the color of the led to green
         */
        void setGreen(){
            digitalWrite(LED_RED, LOW);
            digitalWrite(LED_GREEN, HIGH);
            digitalWrite(LED_BLUE, LOW);
        }

        /**
         * sets the color of the led to blue
         */
        void setBlue(){
            digitalWrite(LED_RED, LOW);
            digitalWrite(LED_GREEN, LOW);
            digitalWrite(LED_BLUE, HIGH);
        }
};

#endif