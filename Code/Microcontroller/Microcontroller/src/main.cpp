#include <Arduino.h>
#include <constants.h>
#include "NetworkManager.cpp"
#include "StatusLED.cpp"

void handle_buttonPress();

bool config_mode = false;

void setup(){
    Serial.begin(9600);
    pinMode(BUTTON_PIN, INPUT_PULLDOWN);
    attachInterrupt(BUTTON_PIN, handle_buttonPress, RISING);
    StatusLED::initializePins();
    if(NetworkManager::startClient()){
        StatusLED::setGreen();
    } else {
        StatusLED::setRed();
    }
}

void loop(){

}

static void handle_buttonPress(){
    config_mode = true;
}