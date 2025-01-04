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
int wlan_reconnect_tries = 0;
unsigned long last_log_size = 0;
String last_log = "";
String name;

unsigned long wlan_connection_start = 0;
int wlan_reconnection_tries = 0;

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
void activateStandby();

void setup(){
    //set serial baudrate
    Serial.begin(SERIAL_BAUDRATE);

    //initialize button pin and attach interrupt to button
    pinMode(BUTTON_PIN, INPUT_PULLDOWN);
    esp_sleep_enable_ext0_wakeup(GPIO_NUM_12, 1); //wakes the esp32 up from deep sleep, when gpio 12 (button pin) is HIGH

    //getting instances of singleton classes
    network = NetworkManager::getInstance();
    statusLED = StatusLED::getInstance();
    memory = MemoryManager::getInstance();
    server = ServerManager::getInstance();
    battery = BatteryManager::getInstance();
    audio = AudioManager::getInstance();

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
        name = "MSA_" + mac.substring(0,1); //setting default name
    }
    Logger::add("Name: " + name);

    //if WLAN-credentials are set, read them and try to connect to WLAN
    if(memory->isWlanSsidSet() && memory->isWlanPasswordSet()){
        Logger::add("wlan credentials set in memory");
        String wlan_ssid = memory->readWlanSsid();
        String wlan_password = memory->readWlanPassword();
        Logger::add("SSID: " + wlan_ssid);
        Logger::add("password: " + wlan_password);
        Logger::add("starting wlan client");
        network->startClient(wlan_ssid, wlan_password, name);
        wlan_connection_start = millis();
        while(!network->isConnectedToWlan() && mode != ERROR){
            Serial.print(".");
            delay(100);
            if((millis() - wlan_connection_start) >= MAX_CONNECTION_TIME){ //if the max connection time for the wifi is exceeded, activate error mode
                Logger::add("max wlan connection time exceeded");
                setMode(ERROR);
            }
        }
        if(network->isConnectedToWlan()){ //if connected to wlan, set mode to normal
            Logger::add("connected to wlan");
            setMode(NORMAL);
        }
    } else { //if wlan credentials are not set, set mode to error
        Logger::add("wlan credentials not set in memory");
        setMode(ERROR);
    }
}

void loop(){
    handleButton(); //check if button is pressed
    actual_time = millis(); //time since start in ms
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
            if(!network->isConnectedToWlan()){ //if not connected to wlan, try to reconnect
                if(wlan_reconnection_tries <= MAX_RECONNECTION_TRIES){
                    network->reconnect();
                    wlan_reconnect_tries ++;
                    Logger::add("reconnecting to wlan");
                } else {
                    Logger::add("not connected to wlan");
                    setMode(ERROR);
                }
            } else {
                int rssi = network->getRssi();
                wlan_reconnect_tries = 0;
            }
            last_wlan_request_time = actual_time;
        }
        if(!audio->isPaused()){ //if audio routine is running, execute audio loop
            audio->loop();
        }
        } else { //mode is config
            if(!network->isApStarted()){ //if ap is not running, start ap
                Logger::add("starting ap");
                network->startAP(name);
            }
        }
        
        if(server->isRunning()){ //if server is running, it should handle clients
            server->handleClient(); 
        } else {
            Logger::add("starting web server");
            server->start();
            Logger::add("setting mDNS");
            if(!network->setmDns(name)){
                Logger::add("mDNS couldn't be set");
            }
        }
    }
}

/**
 * method for setting modes
 * @param m Mode which should be set
 */
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

/**
 * method for checkin if button is pressed
 */
void handleButton(){
    int state = digitalRead(BUTTON_PIN);
    if(state == 1 && last_state == 0){ //button has been pressed
        press_start = millis();
    } else if(state == 0 && last_state == 1){ //button has been released
        press_end = millis();
    }
    if(press_start > 0 && press_end > 0){
        if((press_end - press_start) >= 3000){ 
            setMode(CONFIG);
        } else {
            activateStandby();
        }
        press_start = 0;
        press_end = 0;
    }
    last_state = state;
}

/**
 * method for activating standby mode (deep sleep)
 */
void activateStandby(){
    statusLED->setOff();
    esp_deep_sleep_start();
}