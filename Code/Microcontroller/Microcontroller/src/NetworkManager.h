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
 * providing a web server
 */
class NetworkManager{
    private:
        static NetworkManager* instance;

        bool client_started;

        MemoryManager* memory;
        WiFiClient* stream_pointer;

        /**
         * constructor
         * declares the needed variables
         */
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
         * getter for stream url
         */
        bool wifiCredentialsSet();

        bool isConnectedToWiFi();

        bool isClientStarted();

        String getMac();

        /**
         * scans for available networks and returns the ssid and rssi (strength) of the found networks as a String
         */
        String getAvailableNetworks();
};
#endif