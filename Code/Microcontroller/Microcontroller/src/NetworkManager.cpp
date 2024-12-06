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
 * scans for available networks and returns the ssid and rssi (strength) of the found networks as a String
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
    String networks_str;
    serializeJson(networks, networks_str);
    return networks_str;
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
bool NetworkManager::startClient(String ssid, String password){
    if(WiFi.getMode() == WIFI_AP){ //if wifi is in ap mode, ap mode will be disabled and station mode will be enabled
        WiFi.softAPdisconnect();
        WiFi.mode(WIFI_STA);
    }
    if(WiFi.status() == WL_CONNECTED){
        WiFi.disconnect();
    }
    WiFi.begin(ssid, password);
    //Log::add("connecting to wifi");
    unsigned long start_connection_time = millis();
    while(!isConnectedToWlan()){
        if(millis() - start_connection_time >= MAX_CONNECTION_TIME){
            //Log::add("connection to wifi failed (too long)");
            return false;
        }
    }
    if(isConnectedToWlan()){
        //Log::add("connected to wifi");
        //Log::add(WiFi.localIP().toString());
        //Log::add("connected to wifi");
        return true;
    }
    return false;
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
    return MDNS.begin(name);
}

bool NetworkManager::isApStarted(){
    return ap_started;
}

String NetworkManager::getUtcTime(){
    http.begin(TIME_URL);
    int code = http.GET();
    if(code == 200){
        String time_str = http.getString();
    }
    return "test";
}