/**
 * file with constants, which are needed in the code
 */

#ifndef CONSTANTS_H
#define CONSTANTS_H

#include <Arduino.h>

//definition of pins
const int I2S_BCLK = 26;
const int I2S_LRC = 25;
const int I2S_DOUT = 22;
const int BUTTON_PIN = 12;
const int LED_RED = 15;
const int LED_GREEN = 2;
const int LED_BLUE = 4;

//definition of constants
const int BUTTON_PRESS_SLEEP_TIME = 2000;
const int AUDIO_VOLUME = 10; //0-21
const unsigned long MAX_CONNECTION_TIME = 5000;
const int SERVER_PORT = 80;
const IPAddress AP_LOCAL_IP(192,168,0,1);
const IPAddress AP_GATEWAY_IP(192,168,0,1);
const IPAddress AP_SUBNET_IP(255,255,255,0);
const String AP_SSID = "Microcontroller";
const String WIFI_CREDENTIALS_PREFERENCES_NAMESPACE = "wifi_credentials";
const String SSID_PREFERENCES_KEY = "ssid";
const String PASSWORD_PREFERENCES_KEY = "password";

/*
//declaration of enum for status
enum Status {
  OK,
  CONFIG,
  ERROR
};
*/

#endif