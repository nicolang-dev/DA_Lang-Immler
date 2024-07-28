#include <WiFiManager.h>

WiFiManager::WiFiManager(std::string ssid, std::string password){
    this->ssid = ssid;
    this->password = password;
}

void WiFiManager::connect(){
    WiFi.begin(ssid, password);
    while(WiFi.status() != WL_CONNECTED){}
    if(WiFi.status() == WL_CONNECTED){
        setConnected(true);
    }
}

string WiFiManager::getInfo(){
    if(WiFi.status() == WL_CONNECTED){
        return WiFi.localIP().toString();
    }
}

void WiFiManager::disconnect(){
    if(WiFi.status() == WL_CONNECTED){
        WiFi.disconnect();
    }
}