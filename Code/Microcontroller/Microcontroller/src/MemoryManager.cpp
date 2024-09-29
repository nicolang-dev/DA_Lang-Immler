#include "MemoryManager.h"

MemoryManager* MemoryManager::instance = nullptr;

MemoryManager::MemoryManager(){}
MemoryManager::~MemoryManager(){}

MemoryManager* MemoryManager::getInstance(){
    if (!instance) {
        instance = new MemoryManager();
    }
    return instance;
}

bool MemoryManager::isWifiSsidSet(){
    preferences.begin(WIFI_NS.c_str());
    return preferences.isKey(SSID_KEY.c_str());
    preferences.end();
}

bool MemoryManager::isWifiPasswordSet(){
    preferences.begin(WIFI_NS.c_str());
    return preferences.isKey(PASSWORD_KEY.c_str());
    preferences.end();
}

String MemoryManager::readWifiSsid(){
    preferences.begin(WIFI_NS.c_str());
    String ssid = preferences.getString(SSID_KEY.c_str());
    preferences.end();
    return ssid;
}

String MemoryManager::readWifiPassword(){
    preferences.begin(WIFI_NS.c_str());
    String ssid = preferences.getString(PASSWORD_KEY.c_str());
    preferences.end();
    return ssid;
}

void MemoryManager::writeWifiSsid(String ssid){
    preferences.begin(WIFI_NS.c_str());
    preferences.putString(SSID_KEY.c_str(), ssid);
    preferences.end();
}

void MemoryManager::writeWifiPassword(String password){
    preferences.begin(WIFI_NS.c_str());
    preferences.putString(PASSWORD_KEY.c_str(), password);
    preferences.end();
}