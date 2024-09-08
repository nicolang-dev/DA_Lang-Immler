#ifndef NETWORKMANAGER_H
#define NETWORKMANAGER_H

#include <WiFi.h>
#include <WebServer.h>
#include <constants.h>
#include <Preferences.h>
#include <ArduinoJson.h>

class NetworkManager{
    private:
        static String client_ssid;
        static String client_password;

        static String stream_url;

        static Preferences preferences;
        static WebServer server;

        static JsonDocument getInfo(){
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

        static void handle_get(){
            server.send(200, "text/plain", "get request received!");
        }

        static void handle_getInfo(){
            JsonDocument info = getInfo();
            String info_str;
            serializeJson(info, info_str);
            server.send(200, "application/json", info_str);
        }

        static void handle_setWiFiCredentials(){
            if(server.hasArg("ssid") && server.hasArg("password")){
                String ssid = server.arg("ssid");
                String password = server.arg("password");
                server.send(200);
                if((ssid.length() < 0) && (password.length() > 0)){
                    client_ssid = ssid;
                    client_password = password;
                }
            }
        }

        static void handle_setStreamUrl(){
            if(server.hasArg("url")){
                stream_url = server.arg("url");
                server.send(200);
            }
        }

        static void handle_notFound(){
            server.send(404, "text/plain", "not found!");
        }

    public:
        static void readWiFiCredentials(){
            preferences.begin(WIFI_CREDENTIALS_PREFERENCES_NAMESPACE.c_str(), false);
            if(preferences.isKey(SSID_PREFERENCES_KEY.c_str()) && preferences.isKey(PASSWORD_PREFERENCES_KEY.c_str())){
                client_ssid = preferences.getString(SSID_PREFERENCES_KEY.c_str());
                client_password = preferences.getString(PASSWORD_PREFERENCES_KEY.c_str());
                preferences.end();
            }
            preferences.end();
        }

        static void writeWiFiCredentials(String ssid, String password){
            preferences.begin(WIFI_CREDENTIALS_PREFERENCES_NAMESPACE.c_str(), false);
            preferences.clear();
            preferences.putString(SSID_PREFERENCES_KEY.c_str(), ssid);
            preferences.putString(PASSWORD_PREFERENCES_KEY.c_str(), password);
            preferences.end();
        }

        static boolean startAP(){
            if(WiFi.getMode() != WIFI_AP){
                WiFi.mode(WIFI_AP);
            }
            WiFi.softAPConfig(AP_LOCAL_IP, AP_GATEWAY_IP, AP_SUBNET_IP);
            WiFi.softAP(AP_SSID);
            return true;
        }

        static boolean startClient(char *client_ssid, char *client_password){
            if(WiFi.getMode() != WIFI_STA){
                WiFi.mode(WIFI_STA);
            }
            if(WiFi.status() == WL_CONNECTED){
                WiFi.disconnect();
            }
            WiFi.begin(client_ssid, client_password);
            while(WiFi.status() != WL_CONNECTED){
                delay(1);
            }
            if(WiFi.status() == WL_CONNECTED){
                return true;
            }
            return false;
        }

        static boolean startWebServer(){
            server.begin(SERVER_PORT);
            server.on("/", HTTP_GET, handle_get);
            server.on("/getInfo", HTTP_GET, handle_getInfo);
            server.on("/setWiFiCredentials", HTTP_POST, handle_setWiFiCredentials);
            server.on("/setStreamUrl", HTTP_POST, handle_setStreamUrl);
            server.onNotFound(handle_notFound);
        }

        static String getStreamUrl(){
            if(stream_url.length() > 0){
                return stream_url;
            }
            return "";
        }
};
#endif