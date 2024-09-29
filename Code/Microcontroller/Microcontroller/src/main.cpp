//including libraries
#include <Arduino.h>
#include <constants.h>
//#include "NetworkManager.cpp"
#include "StatusLED.cpp"
#include <Log.cpp>
#include "MemoryManager.cpp"

void handle_buttonPress();
void print(String message);

bool config_mode = false;
bool webserver_running = false;

//NetworkManager* networkManager;
StatusLED* statusLED;
MemoryManager* memoryManager;

void setup(){
    Serial.begin(9600);
    memoryManager = MemoryManager::getInstance();
    //networkManager = NetworkManager::getInstance();
    statusLED = StatusLED::getInstance();
    Log::initialize();
    //networkManager->startAP();
    //networkManager->startWebServer();

    /*
    networkManager = NetworkManager::getInstance();
    statusLED = StatusLED::getInstance();
    Serial.begin(9600);
    //initializing pin of button
    pinMode(BUTTON_PIN, INPUT_PULLDOWN);
    //attaching interrupt to button
    attachInterrupt(BUTTON_PIN, handle_buttonPress, RISING);
    //initializing pins of status led
    statusLED->initializePins();
    statusLED->setOff();
    if(networkManager->startClient()){
        print("connected to wifi");
        statusLED->setGreen();
    } else {
        print("connection failed");
        statusLED->setRed();
    }*/
}

void loop(){
    /*
    networkManager->handleWebserverClient();
    if(Log::hasChanged()){
        Serial.println(Log::getLogs());
    }
    */

    /*
    if(networkManager->isWebserverRunning()){
        networkManager->handleWebserverClient();
    }
    if(config_mode){
        print("button pressed");
        networkManager->startAP();
        print("ap started");
        networkManager->startWebServer();
        config_mode = false;
    }
    if(networkManager->wifiCredentialsReceived()){
        print("wifi credentials received");
        print(networkManager->getClientSSID());
        print(networkManager->getClientPassword());
        /*if(networkManager->startClient()){
            print("connected to wifi");
            config_mode = false;
        }*/
    //}
}

void handle_buttonPress(){
    config_mode = true;
}

void print(String message){
    Serial.println(message);
}