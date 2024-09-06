#include <Arduino.h>
#include <WiFi.h>
#include <Audio.h>

#define I2S_BCLK 26
#define I2S_LRC 25
#define I2S_DOUT 22

Audio audio;

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

  audio.setPinout(I2S_BCLK, I2S_LRC, I2S_DOUT);
  audio.setVolume(10);
  audio.connecttohost("https://github.com/schreibfaul1/ESP32-audioI2S/raw/master/additional_info/Testfiles/Pink-Panther.wav");
}

void loop() {
  audio.loop();
}