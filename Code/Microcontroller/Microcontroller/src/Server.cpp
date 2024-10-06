#include "Server.h"

Server* Server::instance = nullptr;

Server::Server(){
    received_ssid = "";
    received_password = "";
    received_url = "";
    network = NetworkManager::getInstance();
}
Server::~Server(){}

Server* Server::getInstance(){
    if (!instance) {
        instance = new Server();
    }
    return instance;
}

void Server::handle_get(){
    server.send(200, "text/plain", "get request received");
}
void Server::handle_getMac(){
    String mac = network->getMac();
    server.send(200, "text/plain", mac);
}
void Server::handle_getAvailableNetworks(){
    String availableNetworks = network->getAvailableNetworks();
    server.send(200, "text/plain", availableNetworks);
}
void Server::handle_setWiFiCredentials(){
    if(server.hasArg("ssid") && server.hasArg("password")){
        received_ssid = server.arg("ssid");
        received_password = server.arg("password");
        server.send(200);
    }
}

void Server::handle_setStreamUrl(){
    if(server.hasArg("url")){
        received_url = server.arg("url");
        server.send(200);
    }
}

void Server::handle_notFound(){
    server.send(404, "not found!");
}

bool Server::start(){
    server.on("/", HTTP_GET, bind(&Server::handle_get, this));
    server.on("/getMac", HTTP_GET, bind(&Server::handle_getMac, this));
    server.on("/getAvailableNetworks", HTTP_GET, bind(&Server::handle_getAvailableNetworks, this));
    server.on("/setWiFiCredentials", HTTP_POST, bind(&Server::handle_setWiFiCredentials, this));
    server.on("/setStreamUrl", HTTP_POST, bind(&Server::handle_setStreamUrl, this));
    server.onNotFound(bind(&Server::handle_notFound, this));
    server.begin(SERVER_PORT);
    return true;
}

bool Server::stop(){
    server.stop();
    return true;
}

void Server::handleClient(){
    server.handleClient();
}

bool Server::wifiCredentialsReceived(){
    return (received_ssid.length() > 0) && (received_password.length() > 0);
}

bool Server::urlReceived(){
    return received_url.length() > 0;
}

String Server::getReceivedSsid(){
    return received_ssid;
}

String Server::getReceivedPassword(){
    return received_password;
}

String Server::getReceivedUrl(){
    return received_url;
}