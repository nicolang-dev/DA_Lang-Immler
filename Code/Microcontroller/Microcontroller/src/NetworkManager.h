#ifndef NETWORKMANAGER_H
#define NETWORKMANAGER_H

//including needed libraries
#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <constants.h>
#include <ArduinoJson.h>
#include <Log.cpp>
#include "MemoryManager.cpp"

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
        String stream_url;

        bool wifi_credentials_received;
        bool webserver_running;
        bool client_started;

        WebServer server;
        MemoryManager* memory;

        /**
         * constructor
         * declares the needed variables
         */
        NetworkManager();
        
        ~NetworkManager();

        /**
         * returns a JSON with basic informations, like:
         * wifi mode (station or access point)
         * mac address
         * local IP address
         * access point hostname
         */
        JsonDocument getInfo();

        /**
         * scans for available networks and returns the ssid and rssi (strength) of the found networks as a String
         */
        String getAvailableNetworks();

        /**
         * handles basic GET requests
         */
        void handle_get();
        
        /**
         * handles get requests on route /getInfo
         * sends information from the getInfo method to the client as a String, formatted as JSON
         */
        void handle_getInfo();

        /**
         * handles get requests on route /getAvailableNetworks
         * sends ssid and rssi (strength) of all found networks to the client as a String, formatted as JSON
         */
        void handle_getAvailableNetworks();

        /**
         * handle get requests on route /getLogs
         * sends logs from class Log as a String to the client
         */
        void handle_getLogs();

        /**
         * handles POST requests on route /setWiFiCredentials
         * reads ssid and password arguments from server and saves them in the EEPROM
         */
        void handle_setWiFiCredentials();

        /**
         * handles POST requests on route /setStreamUrl
         * reads url argument from client and sets this url for the audiostream
         */
        void handle_setStreamUrl();

        void handle_notFound(){
            Log::add("not found");
            server.send(404, "text/plain", "not found!");
        }

    public:
        static NetworkManager* getInstance();

        NetworkManager(const NetworkManager*) = delete;
        NetworkManager& operator = (const NetworkManager&) = delete;

        /**
         * starts an access point
         */
        bool startAP();

        /**
         * starts a wifi client
         */
        bool startClient(char *ssid, char *password);

        /**
         * starts a web server
         */
        bool startWebServer();

        /**
         * stops the web server
         */
        void stopWebServer();
        
        /**
         * handles the clients of the webserver
         */
        void handleWebserverClient();

        /**
         * getter for stream url
         */
        String getStreamUrl();

        bool wifiCredentialsReceived();

        bool isConnectedToWiFi();

        bool isClientStarted();

        bool isWebserverRunning();
};
#endif