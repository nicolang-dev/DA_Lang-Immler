//including libraries
#include <Arduino.h>
#include <constants.h>
#include "NetworkManager.h"
#include "StatusLED.h"
#include "MemoryManager.h"
#include "Log.h"
#include "Server.h"
#include <WiFi.h>

void handle_buttonPress();
void print(String message);

bool config_mode = false;
bool ap_started = false;
bool webserver_started = false;
unsigned long actual_time = 0;
unsigned long last_wifi_request_time = 0;

NetworkManager* network;
StatusLED* statusLED;
MemoryManager* memory;
Server* server;

void setup(){
    //set serial baudrate
    Serial.begin(SERIAL_BAUDRATE);

    //initialize button pin and attach interrupt to button
    pinMode(BUTTON_PIN, INPUT_PULLDOWN);
    attachInterrupt(BUTTON_PIN, handle_buttonPress, RISING);

    //getting instances of singleton classes
    network = NetworkManager::getInstance();
    statusLED = StatusLED::getInstance();
    memory = MemoryManager::getInstance();
    server = Server::getInstance();

    //initializing pins of status led
    statusLED->initializePins();

    //when wifi credentials are set, read them and try to connect to wifi
    if(memory->isWifiSsidSet() && memory->isWifiPasswordSet()){
        //Log::add("wifi ssid and password set");
        String wifi_ssid = memory->readWifiSsid();
        String wifi_password = memory->readWifiPassword();
        //Log::add("starting wifi client");
        network->startClient(wifi_ssid, wifi_password);
        statusLED->setGreen();
    } else { //when wifi credentials are not set, status led is set to red
        //Log::add("wifi ssid and password not set");
        statusLED->setRed();
    }
}

void loop(){
    actual_time = millis();
    /*if(//Log::hasChanged()){
        //Log::add(//Log::getLast//Log());
    }*/

   if(webserver_started){
    server->handleClient();
   }

    //if config mode is active, check if webserver has received wifi credentials
    //if wifi credentials are received, read wifi credentials and restart microcontroller
    if(config_mode){
        if(server->wifiCredentialsReceived()){
            Serial.println("wifi credentials received");
            String received_ssid = server->getReceivedSsid();
            String received_password = server->getReceivedPassword();
            memory->writeWifiSsid(received_ssid);
            memory->writeWifiPassword(received_password);
            ESP.restart();
        }
    } else { //if config mode is not active, check if access point and webserver is started and check if connected to wifi
        if(!(ap_started && webserver_started)){ //if access point and webserver are not started, start access point and webserver
            network->startAP();
            server->start();
            ap_started = true;
            webserver_started = true;
        }
        //check if still connected to wifi
        if((actual_time - last_wifi_request_time) >= WIFI_REQUEST_PERIOD){
            if(network->isConnectedToWiFi()){ //if connected to wifi, set color of status led to green
                statusLED->setGreen();
            } else { //if not connected to wifi, set color of status led to red
                statusLED->setRed(); 
            }
        }
    }
}

void handle_buttonPress(){
    config_mode = true;
}