#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>

HTTPClient http;
WiFiClient *stream_ptr;

void setup(){
    Serial.begin(9600);
    WiFi.begin("AP-II", "MmrL48!?48y");
    Serial.println("connecting");
    while(WiFi.status() != WL_CONNECTED){
        Serial.print(".");
        delay(100);
    }
    http.begin("http://s1-webradio.antenne.de/antenne");
    int resp_code = http.GET();
    Serial.println(resp_code);
    stream_ptr = http.getStreamPtr();
}

void loop(){
    if(WiFi.status() == WL_CONNECTED && http.connected()){
        int len = stream_ptr->available();
        uint8_t *buffer = new uint8_t[len];
        stream_ptr->readBytes(buffer, len);
        Serial.println(buffer[0]);
    }
}