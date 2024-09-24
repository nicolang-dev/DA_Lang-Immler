#ifndef MEMORYMANAGER_H
#define MEMORYMANAGER_H

#include <Arduino.h>
#include <Preferences.h>
#include <constants.h>

class MemoryManager{
    private:
        Preferences preferences;

    public:
        bool isWifiSsidSet(){
            preferences.begin(WIFI_CREDENTIALS_PREFERENCES_NAMESPACE.c_str());
            return preferences.isKey(SSID_PREFERENCES_KEY.c_str());
            preferences.end();
        }

        bool isPasswordSet(){
            preferences.begin(WIFI_CREDENTIALS_PREFERENCES_NAMESPACE.c_str());
            return preferences.isKey(PASSWORD_PREFERENCES_KEY.c_str());
            preferences.end();
        }

        String readWifiSsid(){
            preferences.begin(WIFI_CREDENTIALS_PREFERENCES_NAMESPACE.c_str());
            String ssid = preferences.getString(SSID_PREFERENCES_KEY.c_str());
            preferences.end();
            return ssid;
        }

        String readWifiPassword(){
            preferences.begin(WIFI_CREDENTIALS_PREFERENCES_NAMESPACE.c_str());
            String ssid = preferences.getString(PASSWORD_PREFERENCES_KEY.c_str());
            preferences.end();
            return ssid;
        }

        void writeWifiSsid(String ssid){
            preferences.begin(WIFI_CREDENTIALS_PREFERENCES_NAMESPACE.c_str());
            preferences.putString(SSID_PREFERENCES_KEY.c_str(), ssid);
            preferences.end();
        }

        void writeWifiPassword(String password){
            preferences.begin(WIFI_CREDENTIALS_PREFERENCES_NAMESPACE.c_str());
            preferences.putString(PASSWORD_PREFERENCES_KEY.c_str(), password);
            preferences.end();
        }
};
#endif