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

        bool isWlanSsidSet();

        bool isWlanPasswordSet();

        bool isStreamUrlSet();

        bool areLogsSet();

        String readWlanSsid();

        String readWlanPassword();

        String readStreamUrl();

        String readLogs();

        void writeWlanSsid(String ssid);

        void writeWlanPassword(String password);

        void writeStreamUrl(String url);

        void writeLogs(String logs);
};
#endif