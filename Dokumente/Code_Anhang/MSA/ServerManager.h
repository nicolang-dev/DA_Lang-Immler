#ifndef ServerManager_H
#define ServerManager_H

#include <Arduino.h>
#include <WebServer.h>
#include "constants.h"
#include "NetworkManager.h"
#include "BatteryManager.h"
#include <ArduinoJson.h>
#include "AudioManager.h"
#include "MemoryManager.h"

class ServerManager{
    private:
        static ServerManager* instance;
        ServerManager();
        ~ServerManager();
        ServerManager(const ServerManager*) = delete;
        ServerManager& operator = (const ServerManager&) = delete;
        WebServer server;
        NetworkManager* network;
        BatteryManager* battery;
        AudioManager* audio;
        MemoryManager* memory;
        bool running;

        /**
         * creates a json, filed with info about the adapter
         * 
         * @return info info about the adapter as a serialized json
         */
        String getInfo();

        /**
         * handles a get request to the standard / route
         */
        void handle_get();  

         /**
         * handles a put request to the /getInfo route
         */
        void handle_getInfo();

        /**
         * handles a get request to the /getAvailableNetworks route
         */
        void handle_getAvailableNetworks();

        /**
         * handles a get request to the /getLogs route
         */
        void handle_getLogs();

        /**
         * handles a post request to the /setWifiCredentials route
         */
        void handle_setWifiCredentials();

        /**
         * handles a post request to the /setStreamUrl route
         */
        void handle_setStreamUrl();

        /**
         * handles a post request to the /setName route
         */
        void handle_setName();

        /**
         * handles a post request to the /setVolume route
         */
        void handle_setVolume();

        /**
         * handles a post request to the /pauseStream route
         */
        void handle_pauseStream();

        /**
         * handles a post request to the /continueStream route
         */
        void handle_continueStream();

        /**
         * handles a request to a undefined route
         */
        void handle_notFound();
    public:
        static ServerManager* getInstance();

        /**
         * starts the webserver
         * @return if the start process was successful
         */
        bool start();

        /**
         * stops the webserver
         * @return if the stop process was successful
         */
        bool stop();

        /**
         * handles the clients
         */
        void handleClient();

        /**
         * returns if the wifi credentials are received from the client
         * @return if webserver received WiFi-credentials from client
         */
        bool wlanCredentialsReceived();

        /**
         * handles if the stream url is received from the client
         * @return if webserver received Stream-URL from client
         */
        bool urlReceived();

        /**
         * handles if the name is received from the client
         * @return if webserver received name of microcontroller from client
         */
        bool nameReceived();

        /**
         * handles if the volume is received from the client
         * @return if webserver received volume for audio output from client
         */
        bool volumeReceived();

        /**
         * returns the ssid, which was received from the client
         * @return WLAN-SSID, which the webserver received from the client, as a String
         */
        String getReceivedSsid();

        /**
         * returns the password, which was received from the client
         * @return WLAN-Password, which the webserver received from the client, as a String
         */
        String getReceivedPassword();

        /**
         * returns the url, which was received from the client
         * @return Stream-URL, which the webserver received from the client, as a String
         */
        String getReceivedUrl();

         /**
         * returns the name, which was received from the client
         * @return name of the microcontroller, which the webserver received from the client, as a String
         */
        String getReceivedName();

        /**
         * returns the volume, which was received from the client
         * @return value of the volume which the webserver received from the client, as a int
         */
        int getReceivedVolume();


        /**
         * returns if the webserver is running
         * @return if webserver is running
         */
        bool isRunning();
};
#endif