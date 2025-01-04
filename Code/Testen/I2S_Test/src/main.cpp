#include <Arduino.h>
#include <vector>

using namespace std;

std::vector<String> v;

void setup(){
    Serial.begin(9600);
}

void loop(){
    int size = sizeof(v);
    v.reserve
    Serial.println(size);
    v.push_back("Hello");
    delay(10);
}