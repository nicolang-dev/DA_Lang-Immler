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
String name;
int network_reconnect_tries = 0;

//for button:
unsigned long press_start = 0;
unsigned long press_end = 0;
bool last_state = 0;

NetworkManager* network;
StatusLED* statusLED;
MemoryManager* memory;
ServerManager* server;
AudioManager* audio;
BatteryManager* battery;

void setMode(Mode m);
void handleButton();

void setup(){
    //set serial baudrate
    Serial.begin(SERIAL_BAUDRATE);

    //initialize button pin and attach interrupt to button
    pinMode(BUTTON_PIN, INPUT_PULLDOWN);
    esp_sleep_enable_ext0_wakeup(GPIO_NUM_12, 1); //wakes the esp32 up from deep sleep, when gpio 12 is HIGH

    //getting instances of singleton classes
    network = NetworkManager::getInstance();
    statusLED = StatusLED::getInstance();
    memory = MemoryManager::getInstance();
    server = ServerManager::getInstance();
    battery = BatteryManager::getInstance();

    //initializing pins of status led
    statusLED->initializePins();
    battery->initializePins();

    //initialize i2s
    //audio->initialize(DEFAULT_VOLUME);

    //if logs are already set in the memory, read logs and add them
    /*if(memory->areLogsSet()){
        String logs_str = memory->readLogs();
        std::vector<String> logs = Logger::getLogsFromString(logs_str);
        Logger::setLogs(logs);
    }*/

    //turn status led off at the beginning
    statusLED->setOff();

    //if name is set in memory, read name and use it
    if(memory->isNameSet()){
        name = memory->readName();
    } else {
        Logger::add("name not set in memory - using default name");
        String mac = network->getMac();
        name = "MSA_" + mac.substring(name.length()-4); //setting default name
    }
    Logger::add(name);

    //if WLAN-credentials are set, read them and try to connect to WLAN
    if(memory->isWlanSsidSet() && memory->isWlanPasswordSet()){
        Logger::add("wlan credentials set in memory");
        String wlan_ssid = memory->readWlanSsid();
        String wlan_password = memory->readWlanPassword();
        Logger::add("wlan credentials:");
        Logger::add(wlan_ssid);
        Logger::add(wlan_password);
        Logger::add("starting wlan client");
        network->startClient(wlan_ssid, wlan_password);
        setMode(NORMAL);
    } else { //when Wlan credentials are not set, status led is set to red
        Logger::add("wlan credentials not set in memory");
        setMode(ERROR);
    }
}

void loop(){
    handleButton();
    actual_time = millis();    
    //if theres a new log entry, print it on the serial monitor
    /*if(Logger::getLogSize() > last_log_size){
        String last_log = Logger::getLastLog();
        Logger::add(last_log);
        last_log_size = Logger::getLogSize();
    }*/
    if(mode != ERROR){
        if(mode == NORMAL){
        //check if still connected to Wlan
        if((actual_time - last_wlan_request_time) >= WLAN_REQUEST_PERIOD){
            if(!network->isConnectedToWlan()){ //if connected to Wlan, set color of status led to green
                Logger::add("not connected to wlan");
                setMode(ERROR);
            } else if(!server->isRunning()){
                Logger::add("starting web server");
            server->start();
            network->setmDns(name);
            }
        }
         /*if(audio->isStreaming()){
            audio->loop();
        }*/
    } else {
        if(!network->isApStarted()){
            Logger::add("starting ap");
            network->startAP(name);
        } else if(!server->isRunning()){
            Logger::add("starting web server");
            server->start();
            network->setmDns(name);
        }
    }
    //if webserver is running
    if(server->isRunning()){
        server->handleClient(); //handle client
        //if Wlan credentials are received, read Wlan credentials and restart microcontroller
        if(server->wlanCredentialsReceived()){
            Logger::add("wlan credentials received from client");
            String received_ssid = server->getReceivedSsid(); //read received ssid
            String received_password = server->getReceivedPassword(); //read received password
            Logger::add(received_ssid);
            Logger::add(received_password);
            Logger::add("writing wlan credentials to memory");
            //String all_logs = Logger::getLogsAsString();
            memory->writeWlanSsid(received_ssid); //write ssid to memory
            memory->writeWlanPassword(received_password); //write password to memory
            //memory->writeLogs(all_logs);
            Logger::add("restarting esp32");
            ESP.restart(); //restart microcontroller
        }
        //if server has received a stream-url, the audio class should start streaming
        if(server->urlReceived()){
            String url = server->getReceivedUrl();
            Logger::add("starting audio stream");
            Logger::add(url);
            audio->startStream(url);
        }
        if(server->nameReceived()){
            String received_name = server->getReceivedName();
            Logger::add("name received");
            Logger::add(received_name);
            network->setmDns(received_name);
            memory->writeName(received_name);
        }
        if(server->volumeReceived()){
            int received_volume = server->getReceivedVolume();
            Logger::add("volume received");
            Logger::add(String(received_volume));
            audio->setVolume(received_volume);
        }
    }   
    }
}

void setMode(Mode m){
    if(m == NORMAL){
        Logger::add("setting mode to normal");
        mode = NORMAL;
        statusLED->setGreen();
    } else if(m == ERROR){
        Logger::add("setting mode to error");
        mode = ERROR;
        statusLED->setRed();
    } else if(m == CONFIG){
        Logger::add("setting mode to config");
        mode = CONFIG;
        statusLED->setBlue();
    }
}

void handleButton(){
    int state = digitalRead(BUTTON_PIN);
    if(state == 1 && last_state == 0){ //button has been pressed
        press_start = millis();
    } else if(state == 0 && last_state == 1){ //button has been released
        press_end = millis();
    }
    if(press_start > 0 && press_end > 0){
        if((press_end - press_start) >= 3000){
             Serial.println("pressed for over 3000ms");
        } else {
            Serial.println("pressed for under 3000ms");
        }
        press_start = 0;
        press_end = 0;
    }
    last_state = state;
}

void activateStandby(){
    statusLED->setOff();
    esp_deep_sleep_start();
}

/*void IRAM_ATTR handle_buttonPress() {
    config_mode = true;
}*/

/**
 * starts config mode
 */