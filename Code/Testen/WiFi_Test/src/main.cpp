//wifi credentials sent via wifi from another device
/*
#include <Arduino.h>
#include <WiFi.h>
#include <WebServer.h>

String macAddress;

//server config
char serverSSID[] = "Multiroom_Adapter";
int serverPort = 80;
IPAddress local_ip(192,168,0,1);
IPAddress gateway(192,168,0,1);
IPAddress subnet(255,255,255,0);

//wifi client config
String clientSSID;
String clientPassword;

WebServer server;

//server handle functions declaration
void handle_setWifiCredentials();
void handle_getMac();
void handle_notFound();

void setup() {
  Serial.begin(9600);
  macAddress = WiFi.macAddress();
  Serial.println(macAddress);
  WiFi.mode(WIFI_AP);
  WiFi.softAP(serverSSID);
  WiFi.softAPConfig(local_ip, gateway, subnet);

  Serial.println(WiFi.getMode());

  server.begin(serverPort);
  server.on("/setWifiCredentials", HTTP_POST, handle_setWifiCredentials);
  server.on("/getMac", HTTP_GET, handle_getMac);
  server.onNotFound(handle_notFound);
}

void loop() {
  server.handleClient();
}

void handle_setWifiCredentials(){
  if(server.hasArg("ssid") && server.hasArg("password")){
    clientSSID = server.arg("ssid");
    clientPassword = server.arg("password");
    Serial.println(clientSSID);
    Serial.println(clientPassword);
    server.send(200);
    WiFi.mode(WIFI_STA);
    Serial.println(WiFi.getMode());
    WiFi.begin(clientSSID.c_str(), clientPassword.c_str());
    Serial.println("connecting ...");
    while(WiFi.status() != WL_CONNECTED){
      Serial.print(".");
      delay(50);
    }
    if(WiFi.status() == WL_CONNECTED){
      Serial.println("Connected to WiFI!");
    }
  }
}

void handle_notFound(){
  server.send(404, "text/plain", "not found!");
}

void handle_getMac(){
  Serial.println(macAddress);
  server.send(200, "text/plain", macAddress);
}
*/

/*
//writing and reading eeprom
#include <Arduino.h>
#include <EEPROM.h>

void setup(){
  Serial.begin(9600);
  EEPROM.write(0, 5);
  int val = EEPROM.read(0);
  Serial.println(val);
}
void loop(){}
*/

#include <Arduino.h>
#include <WiFi.h>
#include <ArduinoJson.h>

JsonDocument doc;

void setup(){
  Serial.begin(9600);
  WiFi.mode(WIFI_STA);
  int noOfNetworks = WiFi.scanNetworks();
  Serial.println(noOfNetworks);
  for(int i = 0; i < noOfNetworks; i ++){
    doc[0]["ssid"] = WiFi.SSID(i);
  }
  serializeJson(doc, Serial);
}

void loop(){}