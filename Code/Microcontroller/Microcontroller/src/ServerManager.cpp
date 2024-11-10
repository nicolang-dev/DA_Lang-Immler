#include "ServerManager.h"

ServerManager* ServerManager::instance = nullptr;

ServerManager::ServerManager(){
    received_ssid = "";
    received_password = "";
    received_url = "";
    received_name = "";
    received_volume = -1;
    network = NetworkManager::getInstance();
    battery = BatteryManager::getInstance();
    running = false;
}
ServerManager::~ServerManager(){}

ServerManager* ServerManager::getInstance(){
    if (!instance) {
        instance = new ServerManager();
    }
    return instance;
}

void ServerManager::handle_get(){
    server.send(200, "text/plain", "get request received");
}

void ServerManager::handle_getMac(){
    String mac = network->getMac();
    server.send(200, "text/plain", mac);
}

void ServerManager::handle_getAvailableNetworks(){
    String availableNetworks = network->getAvailableNetworks();
    server.send(200, "text/plain", availableNetworks);
}

void ServerManager::handle_getBatteryStatus(){
    String batteryStatus = String(battery->getBatteryStatus());
    server.send(200, "text/plain", batteryStatus);
}

void ServerManager::handle_getLogs(){
    String logs = Logger::getLogsAsJSON();
    server.send(200, "text/plain", logs);
}

void ServerManager::handle_setWiFiCredentials(){
    if(server.hasArg("ssid") && server.hasArg("password")){
        received_ssid = server.arg("ssid");
        received_password = server.arg("password");
        server.send(200);
    }
}

void ServerManager::handle_setStreamUrl(){
    if(server.hasArg("url")){
        received_url = server.arg("url");
        server.send(200);
    }
}

void ServerManager::handle_setName(){
    if(server.hasArg("name")){
        received_name = server.arg("name");
        server.send(200);
    }
}

void ServerManager::handle_setVolume(){
    if(server.hasArg("volume")){
        received_volume = server.arg("volume").toInt();
        server.send(200);
    }
}

void ServerManager::handle_notFound(){
    server.send(404, "not found!");
}

bool ServerManager::start(){
    server.begin(SERVER_PORT);
    server.on("/", HTTP_GET, bind(&ServerManager::handle_get, this));
    server.on("/getMac", HTTP_GET, bind(&ServerManager::handle_getMac, this));
    server.on("/getAvailableNetworks", HTTP_GET, bind(&ServerManager::handle_getAvailableNetworks, this));
    server.on("/getBatteryStatus", HTTP_GET, bind(&ServerManager::handle_getBatteryStatus, this));
    server.on("/getLogs", HTTP_GET, bind(&ServerManager::handle_getLogs, this));
    server.on("/setWiFiCredentials", HTTP_POST, bind(&ServerManager::handle_setWiFiCredentials, this));
    server.on("/setStreamUrl", HTTP_POST, bind(&ServerManager::handle_setStreamUrl, this));
    server.on("/setName", HTTP_POST, bind(&ServerManager::handle_setName, this));
    server.on("/setVolume", HTTP_POST, bind(&ServerManager::handle_setVolume, this));
    server.onNotFound(bind(&ServerManager::handle_notFound, this));
    running = true;
    return true;
}

bool ServerManager::stop(){
    server.stop();
    running = false;
    return true;
}

void ServerManager::handleClient(){
    server.handleClient();
}

bool ServerManager::wlanCredentialsReceived(){
    return (received_ssid.length() > 0) && (received_password.length() > 0);
}

bool ServerManager::urlReceived(){
    return received_url.length() > 0;
}

bool ServerManager::nameReceived(){
    return received_name.length() > 0;
}

bool ServerManager::volumeReceived(){
    return received_volume >= 0;
}

String ServerManager::getReceivedSsid(){
    String ssid = received_ssid;
    received_ssid = "";
    return ssid;
}

String ServerManager::getReceivedPassword(){
    String password = received_url;
    received_url = "";
    return password;
}

String ServerManager::getReceivedUrl(){
    String url = received_url;
    received_url = "";
    return url;
}

String ServerManager::getReceivedName(){
    String name = received_name;
    received_name = "";
    return name;
}

int ServerManager::getReceivedVolume(){
    int volume = received_volume;
    received_volume = -1;
    return volume;
}

bool ServerManager::isRunning(){
    return running;
}