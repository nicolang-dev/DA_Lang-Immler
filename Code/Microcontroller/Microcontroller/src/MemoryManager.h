#ifndef MEMORYMANAGER_H
#define MEMORYMANAGER_H

#include <Arduino.h>
#include <Preferences.h>
#include <constants.h>

class MemoryManager{
    private:
        static MemoryManager* instance;

        MemoryManager();
        ~MemoryManager();
        MemoryManager(const MemoryManager&) = delete;
        MemoryManager& operator = (const MemoryManager&) = delete;

        Preferences preferences;

    public:
        static MemoryManager* getInstance();

        bool isWifiSsidSet();

        bool isWifiPasswordSet();

        String readWifiSsid();

        String readWifiPassword();

        void writeWifiSsid(String ssid);

        void writeWifiPassword(String password);
};
#endif