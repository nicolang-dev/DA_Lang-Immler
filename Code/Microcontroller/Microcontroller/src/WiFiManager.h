#include <WiFi.h>
#include <string>

class WiFiManager{
    private:
        const std::string ssid;
        const std::string password;
        bool connected;

    public:
        WiFiManager(std::string ssid, std::string password);
        void connect();
        void disconnect();
        bool isConnected();
        void setConnected(bool connected);
        std::string getInfo();
};