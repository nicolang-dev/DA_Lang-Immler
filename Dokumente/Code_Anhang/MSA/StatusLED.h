#ifndef STATUSLED_H
#define STATUSLED_H

#include <Arduino.h>
#include <constants.h>

/**
 * manages the state of the connected RGB led
 */
class StatusLED{
    private:
        static StatusLED *instance;

        StatusLED();
        ~StatusLED();

    public:
        static StatusLED* getInstance();

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