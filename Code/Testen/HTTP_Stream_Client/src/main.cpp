#include <Arduino.h>
#include <HTTPClient.h>
#include <WiFi.h>

HTTPClient httpClient;
WiFiClient* stream;
bool streamReady = false;

void setup() {
  Serial.begin(9600);
  WiFi.begin("AP-II", "MmrL48!?48y");
  Serial.println("Connecting to WiFi ...");
  while(WiFi.status() != WL_CONNECTED){
    Serial.print(".");
  }
  if(WiFi.status() == WL_CONNECTED){
    Serial.println("Connected to WiFi!");
  }
  httpClient.begin("http://s3-webradio.rockantenne.de/rockantenne");
  int respCode1 = httpClient.GET();
  stream = httpClient.getStreamPtr();
  streamReady = true;
}

void loop() {
  if(streamReady){
    size_t length = stream->available();
    uint8_t buffer[6067];
    stream->readBytes(buffer, length);
    for(int i = 0; i < 6067; i++){
      Serial.print(buffer[i]);
    }
  }
}