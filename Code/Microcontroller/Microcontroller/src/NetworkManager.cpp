#ifndef NETWORKMANAGER_H
#define NETWORKMANAGER_H

//including needed libraries
#include <WiFi.h>
#include <WebServer.h>
#include <constants.h>
#include <Preferences.h>
#include <ArduinoJson.h>

//using namespace std for String an vectors
using namespace std;

/**
 * responsible for network tasks, like:
 * providing an access point
 * acting as a WiFi client
 * providing a web server
 */
class NetworkManager{
    private:
        NetworkManager(){
            client_ssid = "";
            client_password = "";
            stream_url = "";
            wifi_credentials_received = false;
        }

        static NetworkManager *instance;

        String client_ssid;
        String client_password;

        String stream_url;

        bool wifi_credentials_received;

        Preferences preferences;
        WebServer server;

        /**
         * reads SSID from EEPROM
         */
        String readSSID(){
            preferences.begin(WIFI_CREDENTIALS_PREFERENCES_NAMESPACE.c_str(), false);
            if(preferences.isKey(SSID_PREFERENCES_KEY.c_str())){
                return preferences.getString(SSID_PREFERENCES_KEY.c_str());
                preferences.end();
            }
            preferences.end();
            return "";
        }

        /**
         * reads password from EEPROM
         */
        String readPassword(){
            preferences.begin(WIFI_CREDENTIALS_PREFERENCES_NAMESPACE.c_str(), false);
            if(preferences.isKey(PASSWORD_PREFERENCES_KEY.c_str())){
                return preferences.getString(PASSWORD_PREFERENCES_KEY.c_str());
                preferences.end();
            }
            preferences.end();
            return "";
        }

        /**
         * returns a JSON with basic informations, like:
         * wifi mode (station or access point)
         * mac address
         * local IP address
         * access point hostname
         */
        JsonDocument getInfo(){
            JsonDocument info;
            wifi_mode_t wifi_mode = WiFi.getMode();
            info["mac_address"] = WiFi.macAddress();
            if(wifi_mode == WIFI_STA){
                info["wifi_mode"] = "station";
                info["local_ip"] = WiFi.localIP().toString();
            } else {
                info["wifi_mode"] = "access point";
                info["local_ip"] = WiFi.softAPIP().toString();
                info["hostname"] = WiFi.softAPgetHostname();
            }
            return info;
        }

        /**
         * scans for available networks and returns the ssid and rssi (strength) of the found networks as a String
         */
        String getAvailableNetworks(){
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
         * handles basic GET requests
         */
        void handle_get(){
            server.send(200, "text/plain", "get request received!");
        }
        
        /**
         * handles get requests on route /getInfo
         * sends information from the getInfo method to the client as a String, formatted as JSON
         */
        void handle_getInfo(){
            JsonDocument info = getInfo();
            String info_str;
            serializeJson(info, info_str);
            server.send(200, "application/json", info_str);
        }

        /**
         * handles get requests on route /getAvailableNetworks
         * sends ssid and rssi (strength) of all found networks to the client as a String, formatted as JSON
         */
        void handle_getAvailableNetworks(){
            String available_networks = getAvailableNetworks();
            server.send(200, "application/json", available_networks);
        }

        /**
         * handles POST requests on route /setWiFiCredentials
         * reads ssid and password arguments from server and saves them in the EEPROM
         */
        void handle_setWiFiCredentials(){
            if(server.hasArg("ssid") && server.hasArg("password")){
                String ssid = server.arg("ssid");
                String password = server.arg("password");
                server.send(200);
                if((ssid.length() < 0) && (password.length() > 0)){
                    client_ssid = ssid;
                    client_password = password;
                    wifi_credentials_received = true;
                }
            }
        }

        /**
         * handles POST requests on route /setStreamUrl
         * reads url argument from client and sets this url for the audiostream
         */
        void handle_setStreamUrl(){
            if(server.hasArg("url")){
                stream_url = server.arg("url");
                server.send(200);
            }
        }

        void handle_notFound(){
            server.send(404, "text/plain", "not found!");
        }

    public:
        static NetworkManager* getInstance(){
            if(instance == nullptr){
                instance = new NetworkManager();
            }
            return instance;
        }

        NetworkManager(const NetworkManager*) = delete;
        NetworkManager& operator = (const NetworkManager&) = delete;

        /**
         * writes WiFi credentials in EEPROM
         */
        void writeWiFiCredentials(String ssid, String password){
            preferences.begin(WIFI_CREDENTIALS_PREFERENCES_NAMESPACE.c_str(), false);
            preferences.clear();
            preferences.putString(SSID_PREFERENCES_KEY.c_str(), ssid);
            preferences.putString(PASSWORD_PREFERENCES_KEY.c_str(), password);
            preferences.end();
        }

        /**
         * starts an access point
         */
        bool startAP(){
            if(WiFi.getMode() != WIFI_AP){
                WiFi.mode(WIFI_AP);
            }
            WiFi.softAPConfig(AP_LOCAL_IP, AP_GATEWAY_IP, AP_SUBNET_IP);
            WiFi.softAP(AP_SSID);
            return true;
        }

        /**
         * acting as a client
         */
        boolean startClient(){
            String ssid = this->readSSID();
            String password = this->readPassword();
            if((ssid.length() >= 0) && (password.length() >= 0)){
                if(WiFi.getMode() != WIFI_STA){
                    WiFi.mode(WIFI_STA);
                }
                if(WiFi.status() == WL_CONNECTED){
                    WiFi.disconnect();
                }
                WiFi.begin(ssid, password);
                unsigned long connection_start_time = millis();
                while((WiFi.status() != WL_CONNECTED) && ((millis() - connection_start_time) < MAX_CONNECTION_TIME)){
                    delay(1);
                }
                if(WiFi.status() == WL_CONNECTED){
                    return true;
                }
            }
            return false;
        }

        /**
         * starts a web server
         */
        bool startWebServer(){
            server.begin(SERVER_PORT);
            server.on("/", HTTP_GET, bind(&NetworkManager::handle_get, this));
            server.on("/getInfo", HTTP_GET, bind(&NetworkManager::handle_getInfo, this));
            server.on("/getAvailableNetworks", HTTP_GET, bind(&NetworkManager::handle_getAvailableNetworks, this));
            server.on("/setWiFiCredentials", HTTP_POST, bind(&NetworkManager::handle_setWiFiCredentials, this));
            server.on("/setStreamUrl", HTTP_POST, bind(&NetworkManager::handle_setStreamUrl, this));
            server.onNotFound(bind(&NetworkManager::handle_notFound, this));
            return true;
        }

        /**
         * getter for stream url
         */
        String getStreamUrl(){
            return stream_url;
        }

        /**
         * getter for client ssid
         */
        String getClientSSID(){
            return client_ssid;
        }

        /**
         * getter for client password
         */
        String getClientPassword(){
            return client_password;
        }

        bool wifiCredentialsReceived(){
            return wifi_credentials_received;
        }
};
#endif