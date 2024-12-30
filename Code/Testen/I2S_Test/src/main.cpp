#include <Arduino.h>

void setup(){
    Serial.begin(9600);
    pinMode(23, INPUT_PULLDOWN);
}

bool last_state = 0;
unsigned long press_start = 0;
unsigned long press_end = 0;

void loop(){
    int state = digitalRead(23);
    if(state == 1 && last_state == 0){ //button has been pressed
        press_start = millis();
    } else if(state == 0 && last_state == 1){ //button has been released
        press_end = millis();
    }
    if(press_start > 0 && press_end > 0){
        if((press_end - press_start) >= 3000){
             Serial.println("pressed for over 3000ms");
        } else {
            Serial.println("pressed for under 3000ms");
        }
        press_start = 0;
        press_end = 0;
    }
    last_state = state;
}