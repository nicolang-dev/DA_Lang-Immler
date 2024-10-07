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

bool MemoryManager::isWlanSsidSet(){
    preferences.begin(WLAN_NS.c_str());
    return preferences.isKey(SSID_KEY.c_str());
    preferences.end();
}

bool MemoryManager::isWlanPasswordSet(){
    preferences.begin(WLAN_NS.c_str());
    return preferences.isKey(PASSWORD_KEY.c_str());
    preferences.end();
}

bool MemoryManager::isStreamUrlSet(){
    preferences.begin(URL_NS.c_str());
    return preferences.isKey(URL_KEY.c_str());
    preferences.end();
}

bool MemoryManager::areLogsSet(){
    preferences.begin(LOGS_NS.c_str());
    return preferences.isKey(LOGS_KEY.c_str());
    preferences.end();
}

String MemoryManager::readWlanSsid(){
    preferences.begin(WLAN_NS.c_str());
    String ssid = preferences.getString(SSID_KEY.c_str());
    preferences.end();
    return ssid;
}

String MemoryManager::readWlanPassword(){
    preferences.begin(WLAN_NS.c_str());
    String ssid = preferences.getString(PASSWORD_KEY.c_str());
    preferences.end();
    return ssid;
}


String MemoryManager::readStreamUrl(){
    preferences.begin(URL_NS.c_str());
    String url = preferences.getString(URL_KEY.c_str());
    preferences.end();
    return url;
}

String MemoryManager::readLogs(){
    preferences.begin(LOGS_NS.c_str());
    String logs = preferences.getString(LOGS_KEY.c_str());
    preferences.end();
    return logs;
}

void MemoryManager::writeWlanSsid(String ssid){
    preferences.begin(WLAN_NS.c_str());
    preferences.putString(SSID_KEY.c_str(), ssid);
    preferences.end();
}

void MemoryManager::writeWlanPassword(String password){
    preferences.begin(WLAN_NS.c_str());
    preferences.putString(PASSWORD_KEY.c_str(), password);
    preferences.end();
}

void MemoryManager::writeStreamUrl(String url){
    preferences.begin(URL_NS.c_str());
    preferences.putString(URL_KEY.c_str(), url);
    preferences.end();
}

void MemoryManager::writeLogs(String logs){
    preferences.begin(LOGS_NS.c_str());
    preferences.putString(LOGS_KEY.c_str(), logs);
    preferences.end();
}