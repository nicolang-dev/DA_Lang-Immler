#include <WiFi.h>
#include <list>
#include <WebServer.h>
#include <EEPROM.h>

using namespace std;

class WiFiManager{
    public:
        static String client_ssid;
        static String client_password;
        static String host_ssid;
        static String host_password;
        IPAddress server_ip(192,168,0,1);
        IPAddress gateway_ip(192,168,0,1);
        IPAddress subnet_ip(255,255,255,0);

        static boolean credentialsSet(){
            String val1;
            String val2;
            EEPROM.get(0, val1);
            EEPROM.get(1, val2);
            
            return (val1.length() > 0) && (val2.lenght() > 0);
        }

        static boolean startApMode(String ssid, IPAddress ip){
            if((WiFi.getMode() != WIFI_AP) && (ssid.length() > 0) && (ip.toString().length() > 0)){
                IPAddress gateway_ip(255,255,255,0);
                IPAddress subnet_ip(ap_ip);
                WiFi.mode(WIFI_AP);
                WiFi.softAPConfig(ap_ip, gateway_ip, subnet_ip);
                WiFi.softAP(ap_ssid);
                return true;
            } else {
                return false;
            }
        }

        static boolean startStationMode(String ssid, String password){
            if((WiFi.getMode() != WIFI_STA) && (ssid.length() > 0) && (password.length() > 0)){
                WiFi.mode(WIFI_STA);
                WiFi.begin(sta_ssid, sta_password);
                return true;
            } else {
                return false;
            }
        }

        static boolean isSsidSet(){
            return WiFiManager::sta_ssid.length() > 0;
        }

        static boolean isStationPasswordSet(){
             return WiFiManager::sta_password.length() > 0;
        }

        void handle_setWiFiCredentials(){}
        
        void handle_getMacAddress(){}

        static boolean startServer(int port){
            if((WiFi.getMode() == WIFI_AP) && (port > 0)){
                WiFiManager::server.begin(port);
                WiFiManager::server.on("/setWiFiCredentials", HTTP_POST, handle_setWiFiCredentials);
                WiFiManager::server.on("/getMacAddress", HTTP_GET, handle_getMacAddress);
                return true;
            } else {
                return false;
            }
        }

        static boolean stopServer(){
            WiFiManager::server.stop();
        }

        static list<String> getAvailableSsids(){
            WiFi.scanDelete();
            int noOfSsids = WiFi.scanNetworks();
            list<String> availableSsids;
            if(noOfSsids > 0){
                for(int i = 0; i < noOfSsids; i++){
                    availableSsids.push_back(WiFi.SSID(i));
                }
            }
            return availableSsids;
        }

};