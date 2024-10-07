//including libraries
#include <Arduino.h>
#include <constants.h>
#include "NetworkManager.h"
#include "StatusLED.h"
#include "MemoryManager.h"
#include "Logger.h"
#include "ServerManager.h"

void handle_buttonPress();

bool config_mode = false;
unsigned long actual_time = 0;
unsigned long last_wlan_request_time = 0;
unsigned long last_log_size;
String last_log;

NetworkManager* network;
StatusLED* statusLED;
MemoryManager* memory;
ServerManager* server;

void setup(){
    //set serial baudrate
    Serial.begin(SERIAL_BAUDRATE);

    //setting last log size to default 0
    last_log_size = 0;
    last_log = "";

    //initialize button pin and attach interrupt to button
    pinMode(BUTTON_PIN, INPUT_PULLDOWN);
    attachInterrupt(BUTTON_PIN, handle_buttonPress, RISING);

    //getting instances of singleton classes
    network = NetworkManager::getInstance();
    statusLED = StatusLED::getInstance();
    memory = MemoryManager::getInstance();
    server = ServerManager::getInstance();

    //initializing pins of status led
    statusLED->initializePins();

    //if logs are already set in the memory, read logs and add them
    if(memory->areLogsSet()){
        String logs_str = memory->readLogs();
        std::vector<String> logs = Logger::getLogsFromString(logs_str);
        Logger::setLogs(logs);
    }

    //if wlan credentials are set, read them and try to connect to Wlan
    if(memory->isWlanSsidSet() && memory->isWlanPasswordSet()){
        Logger::add("wlan credentials set in memory");
        String wlan_ssid = memory->readWlanSsid();
        String wlan_password = memory->readWlanPassword();
        Logger::add("starting wlan client");
        network->startClient(wlan_ssid, wlan_password);
        statusLED->setGreen();
    } else { //when Wlan credentials are not set, status led is set to red
        Logger::add("wlan credentials not set in memory");
        statusLED->setRed();
    }
}

void loop(){
    actual_time = millis();

    //if theres a new log entry, print it on the serial monitor
    if(Logger::getLogSize() > last_log_size){
        String last_log = Logger::getLastLog();
        Serial.println(last_log);
        last_log_size = Logger::getLogSize();
    }

    //if the webserver is running, it should handle the clients
    if(server->isRunning()){
        server->handleClient();
    }

    //if config mode is active, check if webserver has received Wlan credentials
    //if Wlan credentials are received, read Wlan credentials and restart microcontroller
    if(config_mode){
        if(server->wlanCredentialsReceived()){
            Logger::add("wlan credentials received from client");
            String received_ssid = server->getReceivedSsid();
            String received_password = server->getReceivedPassword();
            Logger::add("writing wlan credentials to memory");
            String all_logs = Logger::getLogsAsString();
            memory->writeWlanSsid(received_ssid);
            memory->writeWlanPassword(received_password);
            memory->writeLogs(all_logs);
            ESP.restart();
        }
    } else { //if config mode is not active, check if access point and webserver is started and check if connected to wlan
        if(!server->isRunning()){ //if access point and webserver are not started, start access point and webserver
            Logger::add("starting web server");
            server->start();
        }
        //check if still connected to Wlan
        if((actual_time - last_wlan_request_time) >= WLAN_REQUEST_PERIOD){
            if(network->isConnectedToWlan()){ //if connected to Wlan, set color of status led to green
                statusLED->setGreen();
            } else { //if not connected to wlan, set color of status led to red
                Logger::add("not connected to wlan");
                statusLED->setRed(); 
            }
        }
    }
}

void handle_buttonPress(){
    config_mode = true;
}