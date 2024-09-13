//including libraries
#include <Arduino.h>
#include <constants.h>
#include "NetworkManager.cpp"
#include "StatusLED.cpp"

void handle_buttonPress();

bool config_mode = false;

NetworkManager* NetworkManager::instance = nullptr;
StatusLED* StatusLED::instance = nullptr;

void setup(){
    NetworkManager* networkManager = NetworkManager::getInstance();
    StatusLED* statusLED = StatusLED::getInstance();
    Serial.begin(9600);
    pinMode(BUTTON_PIN, INPUT_PULLDOWN);
    attachInterrupt(BUTTON_PIN, handle_buttonPress, RISING);
    StatusLED::initializePins();
    if(networkManager->startClient()){
        StatusLED::setGreen();
    } else {
        StatusLED::setRed();
        if(networkManager->startAP()){
            config_mode;
            while(networkManager->wifiCredentialsReceived()){}
            ESP.restart();
        }
    }
}

void loop(){
    if(config_mode){
        if(NetworkManager::wifiCredentialsReceived()){
            if(NetworkManager::startClient()){
                config_mode = false;
            }
        }    
    }
}

static void handle_buttonPress(){
    config_mode = true;
    Serial.println("config mode on");   
    if(NetworkManager::startAP()){
        StatusLED::setGreen();
    } else {
        StatusLED::setRed();
    }
}