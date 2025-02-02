#include "BatteryManager.h"

BatteryManager* BatteryManager::instance = nullptr;

BatteryManager::BatteryManager(){
    pinMode(BATTERY_PIN, INPUT);
}

BatteryManager::~BatteryManager(){}

BatteryManager* BatteryManager::getInstance(){
    if(instance == nullptr){
        instance = new BatteryManager();
    }
    return instance;
}

/**
 * returns the charging status of the battery
 * 
 * @return charging status of the battery, in percent (0 - 100), as a String
 */
int BatteryManager::getBatteryStatus(){
    int val = analogRead(BATTERY_PIN);
    return val/4095 * 100; //to get percent (of the max. value)
}