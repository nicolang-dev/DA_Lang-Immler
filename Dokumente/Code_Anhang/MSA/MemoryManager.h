#ifndef MEMORYMANAGER_H
#define MEMORYMANAGER_H

#include <Arduino.h>
#include <Preferences.h>
#include <constants.h>
#include "Logger.h"

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

        /**
         * returns, if the wlan ssid is set to the memory
         * 
         * @return if WLAN-SSID is set to the memory
         */
        bool isWlanSsidSet();

        /**
         * returns, if the wlan password is set to the memory
         * 
         * @return if WLAN-Password is set to the memory
         */
        bool isWlanPasswordSet();

        /**
         * returns, if the stream url is set to the memory
         * 
         * @return if Stream-URL is set to the memory
         */
        bool isStreamUrlSet();

        /**
         * returns, if the name is set to the memory
         * 
         * @return if name of the microcontroller is set to the memory
         */
        bool isNameSet();

        /**
         * returns, if the last logs are set to the memory
         * 
         * @return if Last logs are set to the memory
         */
        bool areLogsSet();

        /**
         * returns, if the ip-address is set to the memory
         * 
         * @return if ip address is set to the memory
         */
        bool isIpSet();

        /**
         * reads the wlan ssid from the memory
         * @return WLAN-SSID, as a String
         */
        String readWlanSsid();

        /**
         * reads the wlan password from the memory
         * @return WLAN-Password, as a String
         */
        String readWlanPassword();

        /**
         * reads the last stream url from the memory
         * @return last Stream-URL, as a String
         */
        String readStreamUrl();

        /**
         * reads the last logs from the memory
         * @return last Logs, as a String
         */
        String readLogs();

        /**
         * reads the name from the memory
         * 
         * @return name of the microcontroller, as a String
         */
        String readName();

        /**
         * reads the ip address from the memory
         * 
         * @return ip address of the microcontroller, as a String
         */
        String readIp();

        /**
         * writes the given ssid to the memory
         * 
         * @param ssid WLAN-SSID which should be written to the memory
         */
        void writeWlanSsid(String ssid);

        /**
         * writes the given password to the memory
         * 
         * @param password WLAN-Password which should be written to the memory
         */
        void writeWlanPassword(String password);

        /**
         * writes the given url to the memory
         * 
         * @param url Stream-URL which should be written to the memory
         */
        void writeStreamUrl(String url);

        /**
         * writes the given logs to the memory
         * 
         * @param logs Logs which should be written to the memory
         */
        void writeLogs(String logs);

        /**
         * writes the given name to the memory
         * 
         * @param name Name of the microcontroller, as a String
         */
        void writeName(String name);

        /**
         * writes the given ip address to the memory
         * 
         * @param ip IP Address of the microcontroller, as a String
         */
        void writeIp(String ip);

        /**
         * clears the memory
         */
        void clear();
};
#endif