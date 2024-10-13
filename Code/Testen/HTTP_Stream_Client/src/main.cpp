#include <WiFi.h>
#include <HTTPClient.h>
#include <I2S.h>

// WLAN-Zugangsdaten
const char* ssid = "AP-II";
const char* password = "MmrL48!?48y";

// URL des HTTP-Streams
const char* streamURL = "http://wdr-1live-live.icecast.wdr.de/wdr/1live/live/mp3/128/stream.mp3";

HTTPClient http;
WiFiClient* stream;
uint8_t *buffer = new uint8_t[1024];

void setup() {
  Serial.begin(9600);

  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected");

  http.begin(streamURL);
  int httpCode = http.GET();
  Serial.println(httpCode);

    if(httpCode == 302) {
      String location = http.getLocation();
      Serial.println(location);
      http.end();
      http.begin(location);
      httpCode = http.GET();
      Serial.println(httpCode);
    }

    if(httpCode == 200){
      stream = http.getStreamPtr();
    }
}

void loop() {
  if(WiFi.status() == WL_CONNECTED && http.connected()){
    Serial.println(stream->available());
    stream->readBytes(buffer, 1024);
  }
}