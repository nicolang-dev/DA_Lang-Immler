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

    public:
        static NetworkManager* getInstance();

        /**
         * starts the access point
         * 
         * @param starting process successful, as a boolean
         */
        bool startAP();

        /**
         * starts a wifi client
         * 
         * @param ssid WLAN-SSID, as a String
         * @param password WLAN-Password, as a String
         * @return connection successful, as a bool
         */
        bool startClient(String ssid, String password);

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
         * @return all available networks, as a String
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
         * ...
         */
        bool setmDns(String name);
};
#endif