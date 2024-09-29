#ifndef MEMORYMANAGER_H
#define MEMORYMANAGER_H

#include <Arduino.h>
#include <Preferences.h>
#include <constants.h>

class MemoryManager{
    private:
        MemoryManager();
        ~MemoryManager();

        static MemoryManager* instance;

        Preferences preferences;

    public:
        static MemoryManager* getInstance();

        MemoryManager(const MemoryManager&);
        MemoryManager& operator = (const MemoryManager&);

        bool isWifiSsidSet();

        bool isPasswordSet();

        String readWifiSsid();

        String readWifiPassword();

        void writeWifiSsid(String ssid);

        void writeWifiPassword(String password);
};
#endif