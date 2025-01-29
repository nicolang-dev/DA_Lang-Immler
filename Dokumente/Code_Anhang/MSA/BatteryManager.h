#ifndef BATTERYMANAGER_H
#define BATTERYMANAGER_H

#include <Arduino.h>
#include <constants.h>

/**
 * manages the loading and status of the battery
 */
class BatteryManager{
    private:
        static BatteryManager *instance;

        BatteryManager();
        ~BatteryManager();

    public:
        static BatteryManager* getInstance();
        void initializePins();
        int getBatteryStatus();
};
#endif