#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>

HTTPClient http;

void setup(){
    Serial.begin(9600);
    WiFi.disconnect();
    WiFi.mode(WIFI_STA);
    WiFi.begin("AP-II", "MmrL48!?48y");
    while(WiFi.status() != WL_CONNECTED){
        delay(500);
    }
    Serial.println("connected!");

    http.begin("http://http://s5-webradio.rockantenne.de/rockantenne");
    WiFiClient cli = http.getStream();
    cli.
}

void loop(){

}