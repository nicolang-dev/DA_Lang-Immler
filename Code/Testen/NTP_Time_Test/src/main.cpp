#include <WiFi.h>
#include <HTTPClient.h>

HTTPClient http;

void setup() {
  Serial.begin(9600);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(10);
    Serial.print(".");
  }
  Serial.println("wifi connected");
  http.begin("http://worldtimeapi.org/api/timezone/Europe/Vienna");
  int status_code = http.GET();
  String payload = http.getString();
  Serial.println(status_code);
  Serial.println(payload);
}
void loop() {
}