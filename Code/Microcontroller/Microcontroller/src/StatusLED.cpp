#include "StatusLED.h"

StatusLED* StatusLED::instance = nullptr;

StatusLED::StatusLED(){
    //empty
}

StatusLED::~StatusLED(){
    //empty
}

StatusLED* StatusLED::getInstance(){
    if(instance == nullptr){
        instance = new StatusLED();
    }
    return instance;
}

/**
 * initializes the pins / sets them all as an output
 */
void StatusLED::initializePins(){
    pinMode(LED_RED, OUTPUT);
    pinMode(LED_GREEN, OUTPUT);
    pinMode(LED_BLUE, OUTPUT);
}

/**
 * sets the color of the led to red
 */
void StatusLED::setRed(){
    digitalWrite(LED_RED, HIGH);
    digitalWrite(LED_GREEN, LOW);
    digitalWrite(LED_BLUE, LOW);
}

/**
 * sets the color of the led to green
 */
void StatusLED::setGreen(){
    digitalWrite(LED_RED, LOW);
    digitalWrite(LED_GREEN, HIGH);
    digitalWrite(LED_BLUE, LOW);
}

/**
 * sets the color of the led to blue
 */
void StatusLED::setBlue(){
    digitalWrite(LED_RED, LOW);
    digitalWrite(LED_GREEN, LOW);
    digitalWrite(LED_BLUE, HIGH);
}

/**
 * sets the led off (no light)
 */
void StatusLED::setOff(){
    digitalWrite(LED_RED, LOW);
    digitalWrite(LED_GREEN, LOW);
    digitalWrite(LED_BLUE, LOW);
}