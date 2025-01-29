//including header file
#include "NetworkManager.h"

NetworkManager* NetworkManager::instance = nullptr;


/**
 * constructor
 * declares the needed variables
 */
NetworkManager::NetworkManager(){
    ap_started = false;
    //Log::add("network manager class created");
}

NetworkManager* NetworkManager::getInstance(){
    if(instance == nullptr){
        instance = new NetworkManager();
    }
    return instance;
}

/**
 * returns the mac address of the esp32
 */
String NetworkManager::getMac(){
    return WiFi.macAddress();
}

/**
 * scans for available networks and returns the ssid and rssi (strength) of the found networks as a json
 */
String NetworkManager::getAvailableNetworks(){
    JsonDocument networks;
    if(WiFi.getMode() == WIFI_AP){
        int available_networks = WiFi.scanNetworks(false);
        for(int i = 0; i < available_networks; i++){
            networks[i]["ssid"] = WiFi.SSID(i);
            networks[i]["rssi"] = WiFi.RSSI(i);
        }
    }
    String result;
    serializeJson(networks, result);
    return result;
}

/**
 * starts an access point
 */
bool NetworkManager::startAP(String ssid){
    //Log::add("starting ap");
    if(WiFi.getMode() != WIFI_AP){
        WiFi.mode(WIFI_AP);
    }
    ap_started = true;
    return WiFi.softAPConfig(AP_LOCAL_IP, AP_GATEWAY_IP, AP_SUBNET_IP) && WiFi.softAP(ssid);
}

/**
 * starts esp32 wlan client which connects to the access point with the given credentials
 */
bool NetworkManager::startClient(String ssid, String password, String hostname){
    if(WiFi.getMode() == WIFI_AP){ //if wifi is in ap mode, ap mode will be disabled and station mode will be enabled
        WiFi.softAPdisconnect();
        WiFi.mode(WIFI_STA);
    }
    WiFi.disconnect();
    int n = WiFi.scanNetworks();
    for(int i = 0; i < n; i++){
        if(WiFi.SSID(i) == ssid){
            String bssid = WiFi.BSSIDstr(i);
            Logger::add("ap mac: " + bssid);
            WiFi.setHostname(hostname.c_str());
            WiFi.begin(WiFi.SSID(i), password, 0, WiFi.BSSID(i));
            return true;
        }
    }
    return false;
}

void NetworkManager::reconnect(){
    WiFi.reconnect();
}

bool NetworkManager::isApModeActive(){
    return WiFi.getMode() == WIFI_AP;
}

bool NetworkManager::isConnectedToWlan(){
    if(!isApModeActive()){
        return WiFi.status() == WL_CONNECTED;
    }
    return false;
}

bool NetworkManager::setmDns(String name){
    return MDNS.begin(name) && MDNS.addService("http", "tcp", 80);
}

bool NetworkManager::isApStarted(){
    return ap_started;
}

String NetworkManager::getUtcTime(){
    struct tm timeinfo;
    configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
    getLocalTime(&timeinfo);
    return "example";
}

int NetworkManager::getRssi(){
    if(this->isConnectedToWlan()){
        return WiFi.RSSI();
    }
    return 0;
}