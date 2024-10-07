#ifndef SERVER_H
#define SERVER_H

#include <Arduino.h>
#include <WebServer.h>
#include "constants.h"
#include "NetworkManager.h"

class Server{
    private:
        static Server* instance;
        Server();
        ~Server();
        Server(const Server*) = delete;
        Server& operator = (const Server&) = delete;
        WebServer server;
        NetworkManager* network;
        String received_ssid;
        String received_password;
        String received_url;

        void handle_get();  
        void handle_getMac();
        void handle_getAvailableNetworks();
        void handle_setWiFiCredentials();
        void handle_setStreamUrl();
        void handle_notFound();
    public:
        static Server* getInstance();
        bool start();
        bool stop();
        void handleClient();
        bool wifiCredentialsReceived();
        bool urlReceived();
        String getReceivedSsid();
        String getReceivedPassword();
        String getReceivedUrl();
};
#endif