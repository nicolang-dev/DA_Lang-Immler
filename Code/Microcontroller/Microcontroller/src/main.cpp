//including libraries
#include <Arduino.h>
#include <constants.h>
#include "NetworkManager.h"
#include "StatusLED.h"
#include "MemoryManager.h"
#include "Logger.h"
#include "ServerManager.h"
#include "AudioManager.h"

void handle_buttonPress();

bool config_mode = false;
unsigned long actual_time = 0;
unsigned long last_wlan_request_time = 0;
unsigned long last_log_size = 0;
String last_log = "";

NetworkManager* network;
StatusLED* statusLED;
MemoryManager* memory;
ServerManager* server;
AudioManager* audio;

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
    server = ServerManager::getInstance();
    audio = AudioManager::getInstance();

    //initializing pins of status led
    statusLED->initializePins();

    //initialize i2s
    audio->initialize(10);

    //if logs are already set in the memory, read logs and add them
    /*if(memory->areLogsSet()){
        String logs_str = memory->readLogs();
        std::vector<String> logs = Logger::getLogsFromString(logs_str);
        Logger::setLogs(logs);
    }*/

    //if WLAN-credentials are set, read them and try to connect to WLAN
    if(memory->isWlanSsidSet() && memory->isWlanPasswordSet()){
        Serial.println("wlan credentials set in memory");
        String wlan_ssid = memory->readWlanSsid();
        String wlan_password = memory->readWlanPassword();
        Serial.println(wlan_ssid);
        Serial.println(wlan_password);
        Serial.println("starting wlan client");
        network->startClient(wlan_ssid, wlan_password);
        statusLED->setGreen();
    } else { //when Wlan credentials are not set, status led is set to red
        Serial.println("wlan credentials not set in memory");
        statusLED->setRed();
    }
}

void loop(){
    actual_time = millis();

    //if theres a new log entry, print it on the serial monitor
    /*if(Logger::getLogSize() > last_log_size){
        String last_log = Logger::getLastLog();
        Serial.println(last_log);
        last_log_size = Logger::getLogSize();
    }*/

    //if webserver is running, it should handle clients
    if(server->isRunning()){
        server->handleClient();
        //if audio class is not receiving an audio stream and server has received a stream-url, the audio class should start streaming
        if(!audio->isStreaming() && server->urlReceived()){
            String url = server->getReceivedUrl();
            Serial.println("starting audio stream");
            Serial.println(url);
            audio->startStream(url);
        }
    }
    
    //if audio class receives audio stream
    if(audio->isStreaming()){
        audio->loop();
    }

    //if config mode is active, check if webserver has received Wlan credentials
    //if Wlan credentials are received, read Wlan credentials and restart microcontroller
    if(config_mode){
        if(server->isRunning() && server->wlanCredentialsReceived()){
            Serial.println("wlan credentials received from client");
            String received_ssid = server->getReceivedSsid();
            String received_password = server->getReceivedPassword();
            Serial.println(received_ssid);
            Serial.println(received_password);
            Serial.println("writing wlan credentials to memory");
            //String all_logs = Logger::getLogsAsString();
            memory->writeWlanSsid(received_ssid);
            memory->writeWlanPassword(received_password);
            //memory->writeLogs(all_logs);
            Serial.println("restarting esp32");
            ESP.restart();
        }
    } else { //if config mode is not active, check if access point and webserver is started and check if connected to wlan
        if(!server->isRunning()){ //if access point and webserver are not started, start access point and webserver
            Serial.println("server not running");
            Serial.println("starting web server");
            server->start();
        }
        //check if still connected to Wlan
        if((actual_time - last_wlan_request_time) >= WLAN_REQUEST_PERIOD){
            if(network->isConnectedToWlan()){ //if connected to Wlan, set color of status led to green
                statusLED->setGreen();
            } else { //if not connected to wlan, set color of status led to red
                Serial.println("not connected to wlan");
                Serial.println("reconnecting to wlan");
            }
        }
    }
}

void handle_buttonPress(){
    config_mode = true;
}