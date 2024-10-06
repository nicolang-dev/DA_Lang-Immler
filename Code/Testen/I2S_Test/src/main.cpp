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
  Serial.println("connecting");
  while(WiFi.status() != WL_CONNECTED){
    Serial.print(".");
  }
  Serial.print("connected");

  audio.setPinout(I2S_BCLK, I2S_LRC, I2S_DOUT);
  audio.setVolume(10);
  audio.connecttohost("http://mp3.ffh.de/radioffh/hqlivestream.mp3");
}

void loop() {
  audio.loop();
}