#include <WiFi.h>
#include <sys/time.h>

const char* ssid = "AP-II";
const char* password = "MmrL48!?48y";
long unsigned int priorTime = 0;

void setup() {
  Serial.begin(9600);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("connected");

  configTime(0, 0, "pool.ntp.org");

  struct tm timeinfo;
  while (!getLocalTime(&timeinfo)) {
    Serial.println("Warten auf NTP...");
    delay(1000);
  }
  Serial.println("NTP synchronisiert!");
}

void loop() {
  struct timeval tv_now;
  gettimeofday(&tv_now, NULL);

  int64_t milliseconds = (int64_t)tv_now.tv_sec * 1000 + tv_now.tv_usec / 1000;
  int64_t microseconds = (int64_t)tv_now.tv_sec * 1000000 + tv_now.tv_usec;

  Serial.printf("Epoch-Zeit: %ld Sekunden, %lld ms, %lld us\n",
                tv_now.tv_sec, milliseconds, microseconds);
  if((millis() - priorTime) > 1000){
    bool connected = WiFi.status() == WL_CONNECTED;
    Serial.println(connected);
  }
  priorTime = millis();
}
