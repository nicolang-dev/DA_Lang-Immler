#ifndef ServerManager_H
#define ServerManager_H

#include <Arduino.h>
#include <WebServer.h>
#include "constants.h"
#include "NetworkManager.h"

class ServerManager{
    private:
        static ServerManager* instance;
        ServerManager();
        ~ServerManager();
        ServerManager(const ServerManager*) = delete;
        ServerManager& operator = (const ServerManager&) = delete;
        WebServer server;
        NetworkManager* network;
        String received_ssid;
        String received_password;
        String received_url;
        bool running;

        /**
         * handles a get request to the standard / route
         */
        void handle_get();  

        /**
         * handles a get request to the /getMac route
         */
        void handle_getMac();

        /**
         * handles a get request to the /getAvailableNetworks route
         */
        void handle_getAvailableNetworks();
        
        /**
         * handles a post request to the /setWiFiCredentials route
         */
        void handle_setWiFiCredentials();

        /**
         * hanles a post request to the /setStreamUrl route
         */
        void handle_setStreamUrl();

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
         * returns if the webserver is running
         * @return if webserver is running
         */
        bool isRunning();
};
#endif