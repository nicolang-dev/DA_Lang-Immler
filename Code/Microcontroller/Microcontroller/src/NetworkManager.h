#ifndef NETWORKMANAGER_H
#define NETWORKMANAGER_H

//including needed libraries
#include <Arduino.h>
#include <WiFi.h>
#include <constants.h>
#include <ArduinoJson.h>
#include "MemoryManager.h"
#include "Log.h"

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
         */
        bool startAP();

        /**
         * starts a wifi client
         */
        bool startClient(String ssid, String password);

        /**
         * returns the MAC-Address of the ESP32, as a String
         */
        String getMac();

        /**
         * scans for available networks and returns the ssid and rssi (strength)
         * of the found networks as a JSON converted to a String
         */
        String getAvailableNetworks();

        /**
         * returns if wifi module is in access point mode
         */
        bool apModeActive();

        /**
         * returns if wifi client is connected to WLAN
         */
        bool isConnectedToWlan();
};
#endif