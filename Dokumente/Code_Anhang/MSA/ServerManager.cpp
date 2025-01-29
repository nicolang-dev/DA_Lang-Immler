#include "ServerManager.h"

ServerManager* ServerManager::instance = nullptr;

ServerManager::ServerManager(){
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

void ServerManager::handle_getInfo(){
    //Logger::add("get request on route /getInfo received");
    String adapterInfo = getInfo();
    server.send(200, "application/json", adapterInfo);
}

void ServerManager::handle_getAvailableNetworks(){
    Logger::add("get request on route /getAvailableNetworks received");
    String availableNetworks = network->getAvailableNetworks();
    server.send(200, "application/json", availableNetworks);
}

void ServerManager::handle_getLogs(){
    Logger::add("get request on route /getLogs received");
    String logs = Logger::getLogsAsJSON();
    server.send(200, "application/json", logs);
}

void ServerManager::handle_setWifiCredentials(){
    Logger::add("post request on route /setWifiCredentials received");
    if(server.hasArg("ssid") && server.hasArg("password")){
        String ssid = server.arg("ssid");
        String password = server.arg("password");
        Logger::add("writing ssid: " + ssid + " to memory");
        memory->writeWlanSsid(ssid);
        Logger::add("writing password: " + password + " to memory");
        memory->writeWlanPassword(password);
        server.send(201);
        Logger::add("restarting esp");
        ESP.restart();
    } else {
        server.send(400);
    }
}

void ServerManager::handle_setStreamUrl(){
    Logger::add("put request on route /setStreamUrl received");
    if(server.hasArg("url")){
        String url = server.arg("url");
        audio->setStreamUrl(url);
        audio->startStream();
        server.send(200);
    } else {
        server.send(400);
    }
}

void ServerManager::handle_setName(){
    Logger::add("put request on route /setName received");
    if(server.hasArg("name")){
        String name = server.arg("name");
        Logger::add("setting new name: " + name + " to memory");
        memory->writeName(name);
        server.send(200);
        Logger::add("restarting esp");
        ESP.restart();
    } else {
        server.send(400);
    }
}

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
    server.on("/getAvailableNetworks", HTTP_GET, bind(&ServerManager::handle_getAvailableNetworks, this));
    server.on("/getLogs", HTTP_GET, bind(&ServerManager::handle_getLogs, this));
    server.on("/getInfo", HTTP_GET, bind(&ServerManager::handle_getInfo, this));
    server.on("/setName", HTTP_PUT, bind(&ServerManager::handle_setName, this));
    server.on("/setStreamUrl", HTTP_PUT, bind(&ServerManager::handle_setStreamUrl, this));
    server.on("/setVolume", HTTP_PUT, bind(&ServerManager::handle_setVolume, this));
    server.on("/setWifiCredentials", HTTP_POST, bind(&ServerManager::handle_setWifiCredentials, this));
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

bool ServerManager::isRunning(){
    return running;
}