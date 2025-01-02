#include "ServerManager.h"

ServerManager* ServerManager::instance = nullptr;

ServerManager::ServerManager(){
    /*received_ssid = "";
    received_password = "";
    received_url = "";
    received_name = "";
    received_volume = -1;*/
    network = NetworkManager::getInstance();
    battery = BatteryManager::getInstance();
    audio = AudioManager::getInstance();
    memory = MemoryManager::getInstance();
    running = false;
}

ServerManager::~ServerManager(){}

ServerManager* ServerManager::getInstance(){
    if (!instance) {
        instance = new ServerManager();
    }
    return instance;
}

String ServerManager::getInfo(){
    String name = memory->readName();
    String mac = network->getMac();
    int volume = audio->getVolume();
    int battery_status = battery->getBatteryStatus();
    String station_url = audio->getStreamUrl();
    JsonDocument doc;
    doc["name"] = name;
    doc["mac"] = mac;
    doc["volume"] = volume;
    doc["battery"] = battery_status;
    doc["stationUrl"] = station_url;
    String info;
    serializeJson(doc, info);
    return info;
}

void ServerManager::handle_get(){
    Logger::add("get request on route / received");
    server.send(200, "text/plain", "get request received");
}

/*void ServerManager::handle_getMac(){
    String mac = network->getMac();
    server.send(200, "text/plain", mac);
}*/

void ServerManager::handle_getInfo(){
    Logger::add("get request on route /getInfo received");
    String adapterInfo = getInfo();
    server.send(200, "application/json", adapterInfo);
}

void ServerManager::handle_getAvailableNetworks(){
    Logger::add("get request on route /getAvailableNetworks received");
    String availableNetworks = network->getAvailableNetworks();
    server.send(200, "application/json", availableNetworks);
}

/*void ServerManager::handle_getBatteryStatus(){
    String batteryStatus = String(battery->getBatteryStatus());
    server.send(200, "text/plain", batteryStatus);
}*/

void ServerManager::handle_getLogs(){
    Logger::add("get request on route /getLogs received");
    String logs = Logger::getLogsAsJSON();
    server.send(200, "application/json", logs);
}

void ServerManager::handle_setConfigData(){
    Logger::add("post request on router /setConfigData received");
    if(server.hasArg("name") && server.hasArg("wifiSsid") && server.hasArg("wifiPassword")){
        String name = server.arg("name");
        String ssid = server.arg("wifiSsid");
        String password = server.arg("wifiPassword");
        memory->writeName(name);
        memory->writeWlanSsid(ssid);
        memory->writeWlanPassword(password);
        server.send(201);
        Logger::add("restarting esp");
        ESP.restart();
    } else {
        server.send(400);
    }
}

/*void ServerManager::handle_setWiFiCredentials(){
    Logger::add("post request on route /setWiFiCredentials received");
    if(server.hasArg("ssid") && server.hasArg("password")){
        received_ssid = server.arg("ssid");
        received_password = server.arg("password");
        server.send(200);
    }
}*/

/*void ServerManager::handle_setStreamUrl(){
    if(server.hasArg("url")){
        received_url = server.arg("url");
        server.send(200);
    }
}*/

void ServerManager::handle_setStreamUrl(){
    Logger::add("post request on route /setStreamUrl received");
    if(server.hasArg("url")){
        String url = server.arg("url");
        audio->setStreamUrl(url);
        audio->startStream();
        server.send(200);
    } else {
        server.send(400);
    }
}

/*void ServerManager::handle_setName(){
    Logger::add("post request on route /setName received");
    if(server.hasArg("name")){
        received_name = server.arg("name");
        server.send(200);
    }
}*/

void ServerManager::handle_setVolume(){
    Logger::add("put request on route /setVolume received");
    if(server.hasArg("volume")){
        int volume = server.arg("volume").toInt();
        audio->setVolume(volume);
        server.send(200);
    } else {
        server.send(400);
    }
}

void ServerManager::handle_pauseStream(){
    Logger::add("put request on route /pauseStream received");
    audio->stopStream();
    server.send(200);
}

void ServerManager::handle_continueStream(){
    Logger::add("put request on route /continueStream received");
    audio->startStream();
    server.send(200);
}

void ServerManager::handle_notFound(){
    server.send(404, "not found!");
}

bool ServerManager::start(){
    server.begin(SERVER_PORT);
    server.on("/", HTTP_GET, bind(&ServerManager::handle_get, this));
    //server.on("/getMac", HTTP_GET, bind(&ServerManager::handle_getMac, this));
    server.on("/getAvailableNetworks", HTTP_GET, bind(&ServerManager::handle_getAvailableNetworks, this));
    //server.on("/getBatteryStatus", HTTP_GET, bind(&ServerManager::handle_getBatteryStatus, this));
    server.on("/getLogs", HTTP_GET, bind(&ServerManager::handle_getLogs, this));
    server.on("/getInfo", HTTP_GET, bind(&ServerManager::handle_getInfo, this));
    //server.on("/setWiFiCredentials", HTTP_POST, bind(&ServerManager::handle_setWiFiCredentials, this));
    server.on("/setStreamUrl", HTTP_PUT, bind(&ServerManager::handle_setStreamUrl, this));
    //server.on("/setName", HTTP_POST, bind(&ServerManager::handle_setName, this));
    server.on("/setVolume", HTTP_PUT, bind(&ServerManager::handle_setVolume, this));
    server.on("/setConfigData", HTTP_POST, bind(&ServerManager::handle_setConfigData, this));
    server.on("/pauseStream", HTTP_POST, bind(&ServerManager::handle_pauseStream, this));
    server.on("/continueStream", HTTP_POST, bind(&ServerManager::handle_continueStream, this));
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

/*bool ServerManager::wlanCredentialsReceived(){
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
}*/

bool ServerManager::isRunning(){
    return running;
}