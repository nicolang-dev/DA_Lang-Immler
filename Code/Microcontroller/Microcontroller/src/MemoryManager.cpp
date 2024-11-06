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
    preferences.begin(MEMORY_NAMESPACE.c_str());
    return preferences.isKey(SSID_KEY.c_str());
    preferences.end();
}

bool MemoryManager::isWlanPasswordSet(){
    preferences.begin(MEMORY_NAMESPACE.c_str());
    return preferences.isKey(PASSWORD_KEY.c_str());
    preferences.end();
}

bool MemoryManager::isStreamUrlSet(){
    preferences.begin(MEMORY_NAMESPACE.c_str());
    return preferences.isKey(URL_KEY.c_str());
    preferences.end();
}

bool MemoryManager::isNameSet(){
    preferences.begin(MEMORY_NAMESPACE.c_str());
    return preferences.isKey(NAME_KEY.c_str());
    preferences.end();
}

bool MemoryManager::areLogsSet(){
    preferences.begin(MEMORY_NAMESPACE.c_str());
    return preferences.isKey(LOGS_KEY.c_str());
    preferences.end();
}

String MemoryManager::readWlanSsid(){
    preferences.begin(MEMORY_NAMESPACE.c_str());
    String ssid = preferences.getString(SSID_KEY.c_str());
    preferences.end();
    return ssid;
}

String MemoryManager::readWlanPassword(){
    preferences.begin(MEMORY_NAMESPACE.c_str());
    String ssid = preferences.getString(PASSWORD_KEY.c_str());
    preferences.end();
    return ssid;
}


String MemoryManager::readStreamUrl(){
    preferences.begin(MEMORY_NAMESPACE.c_str());
    String url = preferences.getString(URL_KEY.c_str());
    preferences.end();
    return url;
}

String MemoryManager::readLogs(){
    preferences.begin(MEMORY_NAMESPACE.c_str());
    String logs = preferences.getString(LOGS_KEY.c_str());
    preferences.end();
    return logs;
}

void MemoryManager::writeWlanSsid(String ssid){
    preferences.begin(MEMORY_NAMESPACE.c_str());
    preferences.putString(SSID_KEY.c_str(), ssid);
    preferences.end();
}

void MemoryManager::writeWlanPassword(String password){
    preferences.begin(MEMORY_NAMESPACE.c_str());
    preferences.putString(PASSWORD_KEY.c_str(), password);
    preferences.end();
}

void MemoryManager::writeStreamUrl(String url){
    preferences.begin(MEMORY_NAMESPACE.c_str());
    preferences.putString(URL_KEY.c_str(), url);
    preferences.end();
}

void MemoryManager::writeLogs(String logs){
    preferences.begin(MEMORY_NAMESPACE.c_str());
    preferences.putString(LOGS_KEY.c_str(), logs);
    preferences.end();
}

void MemoryManager::writeName(String name){
    preferences.begin(MEMORY_NAMESPACE.c_str());
    preferences.putString(NAME_KEY.c_str(), name);
    preferences.end();
}

String MemoryManager::readName(){
    preferences.begin(MEMORY_NAMESPACE.c_str());
    String name = preferences.getString(NAME_KEY.c_str());
    preferences.end();
    return name;
}

void MemoryManager::clear(){
    preferences.begin(MEMORY_NAMESPACE.c_str());
    preferences.clear();
    preferences.end();
}