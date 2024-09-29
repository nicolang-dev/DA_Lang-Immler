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
        static StatusLED* getInstance();

        /**
         * initializes the pins / sets them all as an output
         */
        void initializePins();

        /**
         * sets the color of the led to red
         */
        void setRed();

        /**
         * sets the color of the led to green
         */
        void setGreen();

        /**
         * sets the color of the led to blue
         */
        void setBlue();

        /**
         * sets the led off (no light)
         */
        void setOff();
};
#endif