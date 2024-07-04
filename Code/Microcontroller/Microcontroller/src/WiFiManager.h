#include <WiFi.h>

class WiFiManager{
    private:
        const char* ssid;
        const char* password;
        bool connected;

    public:
        WiFiManager(char* ssid, char* password);
        void setSsid(const char* ssid);
        void setPassword(const char* password);
        char* getSsid();
        char* getPassword();
        void connect();
        bool isConnected();
        void setConnected(bool connected);
};