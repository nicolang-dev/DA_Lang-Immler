#include <WiFiManager.h>

WiFiManager::WiFiManager(char* ssid, char* password){
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