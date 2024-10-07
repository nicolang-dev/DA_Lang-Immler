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

        bool isStreamUrlSet();

        String readWifiSsid();

        String readWifiPassword();

        String readStreamUrl();

        void writeWifiSsid(String ssid);

        void writeWifiPassword(String password);

        void writeStreamUrl(String url);
};
#endif