//including libraries
#include <Arduino.h>
#include <constants.h>
#include "NetworkManager.h"
#include "StatusLED.h"
#include "MemoryManager.h"
#include "Logger.h"
#include "ServerManager.h"
#include "AudioManager.h"
#include "Mode.h"

Mode mode = NORMAL;
unsigned long actual_time = 0;
unsigned long last_wlan_request_time = 0;
unsigned long last_log_size = 0;
String last_log = "";
String name = DEFAULT_NAME;

NetworkManager* network;
StatusLED* statusLED;
MemoryManager* memory;
ServerManager* server;
AudioManager* audio;
BatteryManager* battery;

//void IRAM_ATTR handle_buttonPress();

void setMode(Mode m);

void setup(){
    //set serial baudrate
    Serial.begin(SERIAL_BAUDRATE);

    //initialize button pin and attach interrupt to button
    pinMode(BUTTON_PIN, INPUT_PULLDOWN);
    //attachInterrupt(BUTTON_PIN, handle_buttonPress, RISING);

    //getting instances of singleton classes
    network = NetworkManager::getInstance();
    statusLED = StatusLED::getInstance();
    memory = MemoryManager::getInstance();
    server = ServerManager::getInstance();
    audio = AudioManager::getInstance();
    battery = BatteryManager::getInstance();

    //initializing pins of status led
    statusLED->initializePins();
    battery->initializePins();

    //initialize i2s
    audio->initialize(DEFAULT_VOLUME);

    //if logs are already set in the memory, read logs and add them
    /*if(memory->areLogsSet()){
        String logs_str = memory->readLogs();
        std::vector<String> logs = Logger::getLogsFromString(logs_str);
        Logger::setLogs(logs);
    }*/

    //turn status led off at the beginning
    statusLED->setOff();

    //if name is set in memory, use name
    if(memory->isNameSet()){
        name = memory->readName();
    } else {
        Logger::add("name not set in memory - using default name", actual_time);
    }

    //if WLAN-credentials are set, read them and try to connect to WLAN
    if(memory->isWlanSsidSet() && memory->isWlanPasswordSet()){
        Logger::add("wlan credentials set in memory", actual_time);
        String wlan_ssid = memory->readWlanSsid();
        String wlan_password = memory->readWlanPassword();
        Logger::add("wlan credentials:", actual_time);
        Logger::add(wlan_ssid, actual_time);
        Logger::add(wlan_password, actual_time);
        Logger::add("starting wlan client", actual_time);
        network->startClient(wlan_ssid, wlan_password);
        setMode(NORMAL);
    } else { //when Wlan credentials are not set, status led is set to red
        Logger::add("wlan credentials not set in memory", actual_time);
        setMode(ERROR);
    }
}

void loop(){
    actual_time = millis();
    //if button is pressed and config mode is not already active, activate config mode
    if((digitalRead(BUTTON_PIN) == 1) && (mode != CONFIG)){
        setMode(CONFIG);
    }

    //if theres a new log entry, print it on the serial monitor
    /*if(Logger::getLogSize() > last_log_size){
        String last_log = Logger::getLastLog();
        Logger::add(last_log);
        last_log_size = Logger::getLogSize();
    }*/

    //if error mode or config mode is active
    if(mode == NORMAL){
        //check if still connected to Wlan
        if((actual_time - last_wlan_request_time) >= WLAN_REQUEST_PERIOD){
            if(!network->isConnectedToWlan()){ //if connected to Wlan, set color of status led to green
                Logger::add("not connected to wlan", actual_time);
                setMode(ERROR);
            } else if(!server->isRunning()){
                Logger::add("starting web server", actual_time);
            server->start();
            network->setmDns(name);
            }
        }
         if(audio->isStreaming()){
            audio->loop();
        }
    } else if(mode == CONFIG){
        if(!network->isApStarted()){
            Logger::add("starting ap", actual_time);
            network->startAP();
        } else if(!server->isRunning()){
            Logger::add("starting web server", actual_time);
            server->start();
            network->setmDns(name);
        }
    }
    //if webserver is running
    if(server->isRunning()){
        server->handleClient(); //handle client
        //if Wlan credentials are received, read Wlan credentials and restart microcontroller
        if(server->wlanCredentialsReceived()){
            Logger::add("wlan credentials received from client", actual_time);
            String received_ssid = server->getReceivedSsid(); //read received ssid
            String received_password = server->getReceivedPassword(); //read received password
            Logger::add(received_ssid, actual_time);
            Logger::add(received_password, actual_time);
            Logger::add("writing wlan credentials to memory", actual_time);
            //String all_logs = Logger::getLogsAsString();
            memory->writeWlanSsid(received_ssid); //write ssid to memory
            memory->writeWlanPassword(received_password); //write password to memory
            //memory->writeLogs(all_logs);
            Logger::add("restarting esp32", actual_time);
            ESP.restart(); //restart microcontroller
        }
        //if server has received a stream-url, the audio class should start streaming
        if(server->urlReceived()){
            String url = server->getReceivedUrl();
            Logger::add("starting audio stream", actual_time);
            Logger::add(url, actual_time);
            audio->startStream(url);
        }
    }   
}

void setMode(Mode m){
    if(m == NORMAL){
        Logger::add("setting mode to normal", actual_time);
        mode = NORMAL;
        statusLED->setGreen();
    } else if(m == ERROR){
        Logger::add("setting mode to error", actual_time);
        mode = ERROR;
        statusLED->setRed();
    } else if(m == CONFIG){
        Logger::add("setting mode to config", actual_time);
        mode = CONFIG;
        statusLED->setBlue();
    }
}

/*void IRAM_ATTR handle_buttonPress() {
    config_mode = true;
}*/

/**
 * starts config mode
 */