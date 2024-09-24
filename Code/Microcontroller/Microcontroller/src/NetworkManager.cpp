#ifndef NETWORKMANAGER_H
#define NETWORKMANAGER_H

//including needed libraries
#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>
#include <constants.h>
#include <ArduinoJson.h>
#include <Log.cpp>
#include <MemoryManager.cpp>

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
        static NetworkManager *instance;

        MemoryManager memory;

        String stream_url;

        bool wifi_credentials_received;
        bool webserver_running;
        bool client_started;

        WebServer server;

        /**
         * constructor
         * declares the needed variables
         */
        NetworkManager(){
            Log::add("network manager class created");
            stream_url = "";
            wifi_credentials_received = false;
            webserver_running = false;
            client_started = false;
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
            Log::add("get request received");
            server.send(200, "text/plain", "get request received!");
        }
        
        /**
         * handles get requests on route /getInfo
         * sends information from the getInfo method to the client as a String, formatted as JSON
         */
        void handle_getInfo(){
            Log::add("get info request received");
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
            Log::add("get available networks request received");
            String available_networks = getAvailableNetworks();
            server.send(200, "application/json", available_networks);
        }

        /**
         * handle get requests on route /getLogs
         * sends logs from class Log as a String to the client
         */
        void handle_getLogs(){
            Log::add("get logs request received");
            //String logs = log.getAllLogs();
            server.send(200, "text/plain", "get logs request received");
        }

        /**
         * handles POST requests on route /setWiFiCredentials
         * reads ssid and password arguments from server and saves them in the EEPROM
         */
        void handle_setWiFiCredentials(){
            Log::add("set wifi credentials request received");
            if(server.hasArg("ssid") && server.hasArg("password")){
                String ssid = server.arg("ssid");
                String password = server.arg("password");
                Log::add(ssid);
                Log::add(password);
                server.send(200);
                if((ssid.length() < 0) && (password.length() > 0)){
                    memory.writeWifiSsid(ssid);
                    memory.writeWifiPassword(password);
                    wifi_credentials_received = true;
                }
            }
        }

        /**
         * handles POST requests on route /setStreamUrl
         * reads url argument from client and sets this url for the audiostream
         */
        void handle_setStreamUrl(){
            Log::add("set stream url request received");
            if(server.hasArg("url")){
                stream_url = server.arg("url");
                Log::add(stream_url);
                server.send(200);
            }
        }

        void handle_notFound(){
            Log::add("not found");
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
         * starts an access point
         */
        bool startAP(){
            Log::add("starting ap");
            if(WiFi.getMode() != WIFI_AP){
                WiFi.mode(WIFI_AP);
            }
            WiFi.softAPConfig(AP_LOCAL_IP, AP_GATEWAY_IP, AP_SUBNET_IP);
            WiFi.softAP(AP_SSID);
            return true;
        }

        /**
         * starts a wifi client
         */
        bool startClient(char *ssid, char *password){
            Log::add("starting client");
            if(wifiCredentialsSet()){
                if(WiFi.getMode() == WIFI_AP){ //if wifi is in ap mode, ap mode will be disabled and station mode will be enabled
                    WiFi.softAPdisconnect();
                    WiFi.mode(WIFI_STA);
                }
                if(WiFi.status() == WL_CONNECTED){
                    WiFi.disconnect();
                }
                WiFi.begin(ssid, password);
                Log::add("connecting to wifi");
                unsigned long start_connection_time = millis();
                while(!isConnectedToWiFi()){
                    if(millis() - start_connection_time >= MAX_CONNECTION_TIME){
                        Log::add("connection to wifi failed (too long)");
                        break;
                        return false;
                    }
                }
                if(isConnectedToWiFi()){
                    Log::add("connected to wifi");
                    return true;
                }
            }
            return false;
        }

        /**
         * starts a web server
         */
        bool startWebServer(){
            Log::add("starting web server");
            server.begin(SERVER_PORT);
            server.on("/", HTTP_GET, bind(&NetworkManager::handle_get, this));
            server.on("/getInfo", HTTP_GET, bind(&NetworkManager::handle_getInfo, this));
            server.on("/getAvailableNetworks", HTTP_GET, bind(&NetworkManager::handle_getAvailableNetworks, this));
            server.on("/setWiFiCredentials", HTTP_POST, bind(&NetworkManager::handle_setWiFiCredentials, this));
            server.on("/setStreamUrl", HTTP_POST, bind(&NetworkManager::handle_setStreamUrl, this));
            server.onNotFound(bind(&NetworkManager::handle_notFound, this));
            webserver_running = true;
            return true;
        }

        /**
         * stops the web server
         */
        void stopWebServer(){
            Log::add("stop webserver");
            server.stop();
            webserver_running = false;
        }
        
        /**
         * handles the clients of the webserver
         */
        void handleWebserverClient(){
            if(isWebserverRunning()){
                server.handleClient();
            }
        }

        /**
         * getter for stream url
         */
        String getStreamUrl(){
            return stream_url;
        }

        bool wifiCredentialsReceived(){
            return wifi_credentials_received;
        }

        bool isConnectedToWiFi(){
            return WiFi.status() == WL_CONNECTED;
        }

        bool isClientStarted(){
            return client_started;
        }

        bool isWebserverRunning(){
            return webserver_running;
        }
};
#endif