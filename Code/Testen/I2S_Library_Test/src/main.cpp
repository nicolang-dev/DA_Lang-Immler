#include <Arduino.h>
#include <WiFi.h>
#include <WiFiMulti.h>
#include <HTTPClient.h>

HTTPClient http;

String url = "http://streams.80s80s.de/web/mp3-192/streams.80s80s.de/";

void setup(){
  Serial.begin(9600);
  WiFi.begin("AP-II", "MmrL48!?48y");
  Serial.println("Connecting ...");
  while(WiFi.status() != WL_CONNECTED){
    Serial.print(".");
  }
  Serial.println(WiFi.localIP());

  http.begin(url);
  int code = http.GET();

  Serial.println(code);

  if(code == 302){
    String new_location = http.header("Location");
    Serial.println(new_location);
  }
}

void loop(){
}