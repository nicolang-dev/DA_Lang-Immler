#ifndef NETWORKMANAGER_H
#define NETWORKMANAGER_H

//including needed libraries
#include <Arduino.h>
#include <WiFi.h>
#include <constants.h>
#include <ArduinoJson.h>
#include "MemoryManager.h"
#include "Logger.h"
#include <ESPmDNS.h>
#include <HTTPClient.h>
#include "time.h"

//using namespace std for String an vectors
using namespace std;

/**
 * responsible for network tasks, like:
 * providing an access point
 * acting as a WiFi client
 */
class NetworkManager{
    private:
        static NetworkManager* instance;
        NetworkManager();
        ~NetworkManager();
        NetworkManager(const NetworkManager*) = delete;
        NetworkManager& operator = (const NetworkManager&) = delete;
        bool ap_started;
        HTTPClient http;
        const char* ntpServer = "pool.ntp.org";
        const long gmtOffset_sec = 0;
        const int daylightOffset_sec = 3600;

    public:
        static NetworkManager* getInstance();

        /**
         * starts the access point
         * 
         * @param ssid SSID of the access point, as a String
         * @return starting process successful, as a boolean
         */
        bool startAP(String ssid);

        /**
         * starts a wifi client
         * 
         * @param ssid WLAN-SSID, as a String
         * @param password WLAN-Password, as a String
         * @return connection successful, as a bool
         */
        bool startClient(String ssid, String password, String hostname);

        /**
         * reconnects to the ap
         */
        void reconnect();

        /**
         * returns the MAC-Address of the ESP32, as a String
         * 
         * @return Mac-Address of the ESP32, as a String
         */
        String getMac();

        /**
         * scans for available networks and returns the ssid and rssi (strength)
         * of the found networks as a JSON converted to a String
         * 
         * @return all available networks, as a serialized json
         */
        String getAvailableNetworks();

        /**
         * returns if wifi module is in access point mode
         * 
         * @return Acces Point Mode active, as a bool
         */
        bool isApModeActive();

        /**
         * returns if wifi client is connected to WLAN
         * 
         * @return connected to WLAN, as a bool
         */
        bool isConnectedToWlan();

        /**
         * sets mDNS
         * 
         * @param name Name of the domain
         */
        bool setmDns(String name);

        /**
         * returns if ap is started
         * 
         * @return ap started, as a bool
         */
        bool isApStarted();

        /**
         * returns the current utc time, requested from a time server, as a String
         * 
         * @return utc time, as a string
         */
        String getUtcTime();

        /**
         * returns the RSSI of the network currently connected
         */
        int getRssi();
};
#endif