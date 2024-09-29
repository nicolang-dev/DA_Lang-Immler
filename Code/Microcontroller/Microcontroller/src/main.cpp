#include <Arduino.h>
#include <Preferences.h>
#include "constants.h"

Preferences preferences;

void setup(){
    Serial.begin(9600);
    //preferences.clear();
    pinMode(BUTTON_PIN, INPUT);
}

void loop(){
    Serial.println(digitalRead(BUTTON_PIN));
}