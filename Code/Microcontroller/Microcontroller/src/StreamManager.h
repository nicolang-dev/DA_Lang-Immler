#ifndef STREAMMANAGER_H
#define STREAMMANAGER_H

#include <Arduino.h>
#include <HTTPClient.h>
#include <WiFi.h>

class StreamManager{
    private:
        static StreamManager *instance;
        StreamManager();
        ~StreamManager();

        HTTPClient http_client;
        WiFiClient *stream;

    public:
        static StreamManager* getInstance();

        void start(String url);

        bool dataAvailable();

        void writeDataInBuffer(uint16_t *buffer);

        void stop();
};
#endif