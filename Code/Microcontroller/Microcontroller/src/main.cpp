#include <EEPROM.h>
#include <WiFi.h>
#include <WebServer.h>
#include <Audio.h>
#include "driver/rtc_io.h"

#define I2S_BCLK 26
#define I2S_LRC 25
#define I2C_DOUT 22
#define BUTTON_PIN 12
#define LED_RED 15
#define LED_GREEN 2
#define LED_BLUE 4

const int BUTTON_PRESS_SLEEP_TIME = 2000;
String wifi_ssid;
String wifi_password;
IPAddress client_ip;
String macAddress;
int maxConnectionTime = 5000;
int server_port = 80;
IPAddress server_ip(192,168,0,1);
IPAddress gateway_ip(192,168,0,1);
IPAddress subnet_ip(255,255,255,0);
String server_ssid = "Microcontroller";
bool server_mode = false;
bool audio_stream_mode = false;
bool wifi_config_mode = false;
Audio audio;

WebServer server(server_port);

void wifiInitialization();
void button_pressed();
void activate_deep_sleep();

void setup(){
  Serial.println("esp32 started!");
  Serial.begin(9600);
  pinMode(BUTTON_PIN, INPUT_PULLDOWN);
  rtc_gpio_pulldown_en(GPIO_NUM_12);
  esp_sleep_enable_ext0_wakeup(GPIO_NUM_12, 1);
  wifiInitialization();
}

void loop(){
  if(digitalRead(BUTTON_PIN) == 1){
    int button_press_start_time = millis();
    int button_press_end_time = 0;
    while(digitalRead(BUTTON_PIN) == 1){}
    if(digitalRead(BUTTON_PIN) == 0){
      button_press_end_time = millis();
    }
    if((button_press_end_time - button_press_start_time) >= BUTTON_PRESS_SLEEP_TIME){
      Serial.println("activating deep sleep!");
      esp_deep_sleep_start();
    } else {
      Serial.println("activating wifi config mode!");
    }
  }
  if(server_mode){
    server.handleClient();
  }
  if(audio_stream_mode){
    audio.loop();
  }
}

bool checkWifiCredentials(String ssid, String password){
  return true;
}

void handle_setWifiCredentials(){
  String ssid;
  String password;
  if(server.hasArg("ssid") && server.hasArg("password")){
    ssid = server.arg("ssid");
    password = server.arg("password");
    if(checkWifiCredentials(ssid, password)){
      server_mode = false;
      WiFi.softAPdisconnect();
      WiFi.mode(WIFI_STA);
      WiFi.begin(ssid, password);
      Serial.println("Connecting with WiFi ...");
      while(WiFi.status() != WL_CONNECTED){
        Serial.print(".");
      }
      if(WiFi.status() == WL_CONNECTED){
        Serial.println("Connected to WiFi!");
      }
    }
  }
}

void handle_setStreamUrl(){
   String streamUrl;
   if(server.hasArg("streamUrl") && WiFi.status() == WL_CONNECTED){
    streamUrl = server.arg("streamUrl");
    Serial.println(streamUrl);
    audio.setPinout(I2S_BCLK, I2S_LRC, I2C_DOUT);
    audio.setVolume(5);
    audio.connecttohost(streamUrl.c_str());
    audio_stream_mode = true;
   }
}

void handle_get(){
  server.send(200, "text/plain", "get request received!");
}

void wifiInitialization(){
  EEPROM.get(0, wifi_ssid);
  EEPROM.get(1, wifi_password);

  int connection_startTime = millis();

  if(wifi_ssid.length() == 0 || wifi_password.length() == 0){
    Serial.println("wifi credentials are null");
    WiFi.mode(WIFI_AP);
    WiFi.softAPConfig(server_ip, gateway_ip, subnet_ip);
    WiFi.softAP(server_ssid);
    server.on("/setWifiCredentials", HTTP_POST, handle_setWifiCredentials);
    server.on("/setStreamUrl", HTTP_POST, handle_setStreamUrl);
    server.on("/", HTTP_GET, handle_get);
    server.begin();
    server_mode = true;
  } else {
    WiFi.mode(WIFI_STA);
    WiFi.begin(wifi_ssid, wifi_password);
    Serial.println("Connecting to WiFi...");
    while((WiFi.status() != WL_CONNECTED) && ((millis() - connection_startTime) < maxConnectionTime)){
      Serial.print(".");
    }
    if(WiFi.status() == WL_CONNECTED){
      Serial.println("Connected to WiFi!");
      client_ip = WiFi.localIP();
      Serial.printf("IP: ", client_ip);
      Serial.printf("Mac: ", macAddress);
    } else {
      Serial.println("Connecting to WiFi failed!");
    }
  }
}

void status_LED_GREEN(){
  digitalWrite(LED_GREEN, HIGH);
  digitalWrite(LED_RED, LOW);
  digitalWrite(LED_BLUE, LOW);
}

void status_LED_RED(){
  digitalWrite(LED_GREEN, LOW);
  digitalWrite(LED_RED, HIGH);
  digitalWrite(LED_BLUE, LOW);
}

void status_LED_BLUE(){
  digitalWrite(LED_GREEN, LOW);
  digitalWrite(LED_RED, LOW);
  digitalWrite(LED_BLUE, HIGH);
}


/*#include <Arduino.h>
#include "WiFiManager.cpp"

#define statusLED_RED 0
#define statusLED_GREEN 0
#define statusLED_BLUE 0
#define button_pin 0  

boolean configMode = false;

WiFiManager wifiManager;

void handle_buttonPressed();

void setup() {
  //pin init
  pinMode(statusLED_RED, OUTPUT);
  pinMode(statusLED_GREEN, OUTPUT);
  pinMode(statusLED_BLUE, OUTPUT);
  pinMode(button_pin, INPUT_PULLUP);
  attachInterrupt(button_pin, handle_buttonPressed, CHANGE);
}

void loop() {
  if(configMode){
     wifiManager.startApMode();
     wifiManager.startServer();                                                                                            
  }
}

void setLedColor(int red, int green, int blue){
  analogWrite(statusLED_RED, red);
  analogWrite(statusLED_GREEN, green);
  analogWrite(statusLED_BLUE, blue);
}

void handle_buttonPressed(){

}*/