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

        void handle_get();  
        void handle_getMac();
        void handle_getAvailableNetworks();
        void handle_setWiFiCredentials();
        void handle_setStreamUrl();
        void handle_notFound();
    public:
        static ServerManager* getInstance();
        bool start();
        bool stop();
        void handleClient();
        bool wlanCredentialsReceived();
        bool urlReceived();
        String getReceivedSsid();
        String getReceivedPassword();
        String getReceivedUrl();
        bool isRunning();
};
#endif