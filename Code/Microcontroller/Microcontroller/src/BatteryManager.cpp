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