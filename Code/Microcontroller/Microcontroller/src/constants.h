/**
 * file with constants, which are needed in the code
 */

#ifndef CONSTANTS_H
#define CONSTANTS_H

#include <Arduino.h>

//pins
const int I2S_BCLK_PIN = 26;
const int I2S_LRC_PIN = 25;
const int I2S_DOUT_PIN = 22;
const int BUTTON_PIN = 12;
const int LED_RED = 15;
const int LED_GREEN = 2;
const int LED_BLUE = 4;

//network
const IPAddress AP_LOCAL_IP(192,168,0,1);
const IPAddress AP_GATEWAY_IP(192,168,0,1);
const IPAddress AP_SUBNET_IP(255,255,255,0);
const String AP_SSID = "Microcontroller";

//memory
const String WLAN_NS = "wifi";
const String URL_NS = "url";
const String LOGS_NS = "logs";
const String SSID_KEY = "ssid";
const String PASSWORD_KEY = "password";
const String URL_KEY = "wifi";
const String LOGS_KEY = "logs";

//other constants
const unsigned long SERIAL_BAUDRATE = 9600;
const int BUTTON_PRESS_SLEEP_TIME = 2000;
const unsigned long WLAN_REQUEST_PERIOD = 10000;
const int AUDIO_VOLUME = 10; //0-21
const unsigned long MAX_CONNECTION_TIME = 5000;
const int SERVER_PORT = 80;
#endif