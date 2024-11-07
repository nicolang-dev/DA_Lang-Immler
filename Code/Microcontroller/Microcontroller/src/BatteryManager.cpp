#include "BatteryManager.h"

BatteryManager* BatteryManager::instance = nullptr;

BatteryManager::BatteryManager(){
    //empty
}

BatteryManager::~BatteryManager(){
    //empty
}

BatteryManager* BatteryManager::getInstance(){
    if(instance == nullptr){
        instance = new BatteryManager();
    }
    return instance;
}

/**
 * initializes the needed pins
 */
void BatteryManager::initializePins(){
    // ...
}

/**
 * returns the charging status of the battery
 * 
 * @return charging status of the battery, in percent (0 - 100), as a String
 */
int BatteryManager::getBatteryStatus(){
    return 100; //default
}